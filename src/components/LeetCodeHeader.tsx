import { Link } from "react-router-dom";
import { profile } from "../data/site";
import { GitHubIcon } from "./Icons";
import { leetcode } from "../data/leetcode";

export function LeetCodeHeader() {
  return (
    <header className="leetcode-header">
      <Link className="wordmark" to="/">
        <img
          className="wordmark-mark"
          src={`${import.meta.env.BASE_URL}theme/ouroboros.jpg`}
          alt=""
          width={22}
          height={22}
        />
        <span className="wordmark-text">{profile.name}</span>
      </Link>

      <nav className="leetcode-header-nav" aria-label="LeetCode page">
        <Link to="/">Portfolio</Link>
        <a href={leetcode.profileUrl} target="_blank" rel="noreferrer">LeetCode</a>
        <a href={leetcode.solutionsUrl} target="_blank" rel="noreferrer" aria-label="Solutions on GitHub">
          <GitHubIcon />
        </a>
      </nav>
    </header>
  );
}
