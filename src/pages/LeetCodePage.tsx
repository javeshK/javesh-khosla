import { useEffect, useState } from "react";
import { GitHubIcon } from "../components/Icons";
import { LeetCodeHeader } from "../components/LeetCodeHeader";
import {
  formatDate,
  formatPercent,
  formatRank,
  leetcode,
} from "../data/leetcode";
import { useLeetCodeStats } from "../hooks/useLeetCodeStats";

type DifficultyCard = {
  label: string;
  solved: number;
  total: number;
  className: string;
};

export function LeetCodePage() {
  const { stats, isLive, isRefreshing } = useLeetCodeStats();
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reducedMotion) return;
    const root = document.documentElement;
    const onMove = (event: PointerEvent) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  useEffect(() => {
    document.title = "LeetCode — Javesh Khosla";
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        "content",
        `LeetCode progress for ${stats.username}: ${stats.totalSolved} problems solved.`,
      );
    }
    return () => {
      document.title = "Javesh Khosla — AI, Cybersecurity & Software";
    };
  }, [stats.totalSolved, stats.username]);

  const difficulties: DifficultyCard[] = [
    { label: "Easy", solved: stats.easySolved, total: stats.totalEasy, className: "is-easy" },
    { label: "Medium", solved: stats.mediumSolved, total: stats.totalMedium, className: "is-medium" },
    { label: "Hard", solved: stats.hardSolved, total: stats.totalHard, className: "is-hard" },
  ];

  const maxTopicCount = Math.max(...stats.topicAnalysis.map((item) => item.count), 1);

  return (
    <div className="leetcode-page">
      <div className="leetcode-atmosphere" aria-hidden="true">
        <div className="leetcode-grid" />
        <div className="leetcode-glow" />
      </div>

      <LeetCodeHeader />

      <main className="leetcode-main">
        <section className="leetcode-hero">
          <p className="leetcode-eyebrow">Competitive programming</p>
          <h1>LeetCode Journey</h1>
          <p className="leetcode-lede">
            Tracking my problem-solving progress on{" "}
            <a href={leetcode.profileUrl} target="_blank" rel="noreferrer">@{stats.username}</a>.
            Solutions sync to GitHub automatically via LeetHub.
          </p>
          <div className="leetcode-hero-actions">
            <a className="btn btn-primary leetcode-btn" href={leetcode.profileUrl} target="_blank" rel="noreferrer">
              View on LeetCode
            </a>
            <a className="btn btn-ghost leetcode-btn" href={leetcode.solutionsUrl} target="_blank" rel="noreferrer">
              <GitHubIcon />
              Browse solutions
            </a>
          </div>
          <p className="leetcode-meta">
            {isRefreshing ? "Refreshing stats…" : isLive ? "Live stats" : "Cached stats"}
            {" · "}
            Updated {formatDate(stats.lastUpdated)}
          </p>
        </section>

        <section className="leetcode-stats" aria-label="Solved problems">
          <article className="leetcode-stat-card leetcode-stat-card--total">
            <span className="leetcode-stat-value">{stats.totalSolved}</span>
            <span className="leetcode-stat-label">Problems solved</span>
            <span className="leetcode-stat-sub">
              {formatPercent(stats.totalSolved, stats.totalQuestions)} of {stats.totalQuestions.toLocaleString()} total
            </span>
          </article>

          <article className="leetcode-stat-card">
            <span className="leetcode-stat-value">{stats.acceptanceRate.toFixed(0)}%</span>
            <span className="leetcode-stat-label">Acceptance rate</span>
          </article>

          <article className="leetcode-stat-card">
            <span className="leetcode-stat-value">{formatRank(stats.ranking)}</span>
            <span className="leetcode-stat-label">Global rank</span>
          </article>
        </section>

        <section className="leetcode-difficulty" aria-label="Solved by difficulty">
          <h2>By difficulty</h2>
          <div className="leetcode-difficulty-grid">
            {difficulties.map((item) => (
              <article key={item.label} className={`leetcode-difficulty-card ${item.className}`}>
                <div className="leetcode-difficulty-head">
                  <span>{item.label}</span>
                  <strong>{item.solved}</strong>
                </div>
                <div className="leetcode-progress-track" aria-hidden="true">
                  <div
                    className="leetcode-progress-fill"
                    style={{ width: `${(item.solved / item.total) * 100}%` }}
                  />
                </div>
                <p>{item.solved} / {item.total} solved ({formatPercent(item.solved, item.total)})</p>
              </article>
            ))}
          </div>
        </section>

        {stats.topicAnalysis.length > 0 && (
          <section className="leetcode-topics" aria-label="Topics covered">
            <h2>Topics</h2>
            <ul className="leetcode-topic-list">
              {stats.topicAnalysis.map((item) => (
                <li key={item.topic}>
                  <span className="leetcode-topic-name">{item.topic}</span>
                  <span className="leetcode-topic-bar" aria-hidden="true">
                    <span style={{ width: `${(item.count / maxTopicCount) * 100}%` }} />
                  </span>
                  <span className="leetcode-topic-count">{item.count}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer className="leetcode-footer">
        <p>
          <a href="/">← Back to portfolio</a>
        </p>
        <p>Solutions auto-synced via <a href="https://github.com/arunbhardwaj/LeetHub-2.0" target="_blank" rel="noreferrer">LeetHub 2.0</a></p>
      </footer>
    </div>
  );
}
