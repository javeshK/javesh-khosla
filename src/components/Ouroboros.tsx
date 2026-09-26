type Props = {
  className?: string;
  size?: number;
};

export function Ouroboros({ className, size = 44 }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 8c13.3 0 24 10.7 24 24S45.3 56 32 56 8 45.3 8 32c0-8 4-14.8 10-19.2"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M18 10.5c2.4-.4 5.2 1.2 6.2 3.8.6 1.6-.1 3-1.4 4.1-2.2 1.8-5.3.6-6.2-1.6-.6-1.4.2-3.4 1.4-6.3Z"
        fill="currentColor"
      />
      <circle cx="21.2" cy="14.2" r="0.9" fill="#1c2128" />
      <path d="M32 24v16M24 32h16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
