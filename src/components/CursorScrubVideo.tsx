/**
 * CursorScrubVideo
 *
 * The playhead is a virtual clock. The pointer only writes `target`.
 * The video element is a display of `current`, never the source of motion.
 *
 * Formulas (seconds, not frames):
 *
 *   look-follow (this clip glances screen-left at mid-point, faces camera at 0):
 *     dx, dy  = (pointer - head) / 0.42
 *     lookLeft = clamp(-dx)          // cursor left of head → glance left
 *     lookDown = clamp(dy)           // cursor below head → glance down
 *     u        = clamp(0.72 lookLeft + 0.28 lookDown)
 *     target   = u * duration * 0.5  // first half only (return trip unused)
 *
 *   tau    = 0.018 / smoothing                   // 0.22 → ~82ms
 *   α      = 1 - exp(-Δt / tau)                  // frame-rate independent
 *   current = current + (target - current) * α
 *
 * Seek only when the previous seek has finished:
 *   |current - video.currentTime| > 1/120
 *
 * Do not lerp from video.currentTime — it lags during seeks and reverses
 * the motion. Do not pause or transform the element while scrubbing.
 *
 * All-keyframe encode recommended:
 * ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 18 -g 1 -keyint_min 1 \
 *   -x264-params "scenecut=0" -profile:v high -pix_fmt yuv420p \
 *   -movflags +faststart -an out.mp4
 */

import { useEffect, useRef, useState } from "react";

export type CursorScrubAxis = "horizontal" | "vertical";
export type CursorScrubTracking = "component" | "window";
export type CursorScrubFit = "cover" | "contain" | "fill";
export type CursorScrubFollow = "axis" | "look";

export type CursorScrubVideoProps = {
  videoFile?: string | File | null;
  axis?: CursorScrubAxis;
  reverse?: boolean;
  trackingArea?: CursorScrubTracking;
  smoothing?: number;
  objectFit?: CursorScrubFit;
  showPoster?: boolean;
  borderRadius?: number;
  className?: string;
  mobilePreview?: boolean;
  reducedMotion?: boolean;
  /**
   * look: playhead follows the pointer relative to the figure.
   * The clip faces the camera at t=0 and glances screen-left at mid-point,
   * then returns — so we only use the first half, and invert X so left
   * of the head looks left (down of the head looks down).
   */
  follow?: CursorScrubFollow;
  lookOriginX?: number;
  lookOriginY?: number;
};

const FRAME = 1 / 120;
const MAX_DT = 0.05;

function clamp01(n: number) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

function tauFromSmoothing(smoothing: number) {
  const s = Math.min(1, Math.max(0.02, smoothing));
  return 0.018 / s;
}

export function CursorScrubVideo({
  videoFile = null,
  axis = "horizontal",
  reverse = false,
  trackingArea = "component",
  smoothing = 0.22,
  objectFit = "cover",
  showPoster = true,
  borderRadius = 0,
  className,
  mobilePreview = false,
  reducedMotion = false,
  follow = "axis",
  lookOriginX = 0.5,
  lookOriginY = 0.46,
}: CursorScrubVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const seekingRef = useRef(false);
  const seekStartedRef = useRef(0);
  const readyRef = useRef(false);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const lastStampRef = useRef(0);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const tau = tauFromSmoothing(smoothing);

  useEffect(() => {
    if (!videoFile) {
      setSrc(null);
      return;
    }
    if (typeof videoFile === "string") {
      setSrc(videoFile);
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let cancelled = false;
    readyRef.current = false;
    seekingRef.current = false;
    currentRef.current = 0;
    targetRef.current = 0;
    setReady(false);

    const markReady = () => {
      if (cancelled || !Number.isFinite(video.duration) || video.duration <= 0) return;
      readyRef.current = true;
      setReady(true);
    };

    const onSeeking = () => {
      seekingRef.current = true;
      seekStartedRef.current = performance.now();
    };
    const onSeeked = () => {
      seekingRef.current = false;
    };

    video.addEventListener("seeking", onSeeking);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("canplaythrough", markReady);
    video.addEventListener("loadedmetadata", markReady);

    video.pause();
    video.load();
    video.currentTime = 0;
    video
      .play()
      .then(() => {
        if (cancelled) return;
        video.pause();
        video.currentTime = 0;
      })
      .catch(() => {});

    const pointerPos = (event: PointerEvent) => {
      if (trackingArea === "window") {
        return {
          x: event.clientX / Math.max(1, window.innerWidth),
          y: event.clientY / Math.max(1, window.innerHeight),
        };
      }
      const root = rootRef.current;
      if (!root) return { x: 0, y: 0 };
      const rect = root.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) / Math.max(1, rect.width),
        y: (event.clientY - rect.top) / Math.max(1, rect.height),
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!readyRef.current || reducedMotion || mobilePreview) return;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const { x, y } = pointerPos(event);

      if (follow === "look") {
        const dx = (clamp01(x) - lookOriginX) / 0.42;
        const dy = (clamp01(y) - lookOriginY) / 0.42;
        const lookLeft = clamp01(-dx);
        const lookDown = clamp01(dy);
        const u = clamp01(lookLeft * 0.72 + lookDown * 0.28);
        targetRef.current = u * duration * 0.5;
        return;
      }

      let pos = axis === "horizontal" ? clamp01(x) : clamp01(y);
      if (reverse) pos = 1 - pos;
      targetRef.current = pos * duration;
    };

    const host: EventTarget =
      trackingArea === "window" ? window : (rootRef.current as HTMLElement);
    host.addEventListener("pointermove", onPointerMove as EventListener, { passive: true });

    const applySeek = () => {
      if (seekingRef.current && performance.now() - seekStartedRef.current < 120) return;
      seekingRef.current = false;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      const t = Math.min(Math.max(currentRef.current, 0), Math.max(0, duration - FRAME));
      if (Math.abs(video.currentTime - t) <= FRAME) return;
      video.currentTime = t;
    };

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      if (reducedMotion || mobilePreview || !readyRef.current) return;

      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const last = lastStampRef.current || now;
      const dt = Math.min(MAX_DT, Math.max(0, (now - last) / 1000));
      lastStampRef.current = now;

      const alpha = 1 - Math.exp(-dt / tau);
      currentRef.current += (targetRef.current - currentRef.current) * alpha;
      applySeek();
    };

    lastStampRef.current = performance.now();
    if (!mobilePreview && !reducedMotion) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      host.removeEventListener("pointermove", onPointerMove as EventListener);
      video.removeEventListener("seeking", onSeeking);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("canplaythrough", markReady);
      video.removeEventListener("loadedmetadata", markReady);
      video.pause();
    };
  }, [src, axis, reverse, trackingArea, tau, mobilePreview, reducedMotion, follow, lookOriginX, lookOriginY]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    if (reducedMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }
    if (mobilePreview) {
      video.loop = true;
      video.playbackRate = 0.55;
      video.play().catch(() => {});
      return () => {
        video.pause();
        video.loop = false;
        video.playbackRate = 1;
      };
    }
    video.loop = false;
    video.pause();
  }, [src, mobilePreview, reducedMotion]);

  if (!src) {
    return (
      <div
        ref={rootRef}
        className={className}
        style={{
          width: "100%",
          height: "100%",
          borderRadius,
          display: "grid",
          placeItems: "center",
          background: "#10141c",
          color: "#c9b896",
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Add a video file
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius,
      }}
    >
      <video
        ref={videoRef}
        className="scrub-media"
        src={src}
        muted
        playsInline
        preload="auto"
        disableRemotePlayback
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          objectFit,
          borderRadius,
          display: "block",
          opacity: showPoster || ready ? 1 : 0,
        }}
      />
      {!ready && (
        <div className="scrub-loading" aria-hidden="true">
          <span />
        </div>
      )}
    </div>
  );
}
