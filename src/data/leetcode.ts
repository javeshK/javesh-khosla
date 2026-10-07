import { links } from "./site";

export type TopicCount = {
  topic: string;
  count: number;
};

export type LeetCodeStats = {
  lastUpdated: string;
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  topicAnalysis: TopicCount[];
};

export const leetcode = {
  username: "javeshkhosla",
  profileUrl: links.leetcode,
  statsApiUrl: "https://leetcode-stats.tashif.codes/javeshkhosla/stats",
  solutionsUrl: "https://github.com/javeshK/javesh-khosla/tree/main/leetcode",
};

type StatsApiResponse = {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  data?: {
    topicAnalysis?: TopicCount[];
  };
};

export function formatRank(rank: number): string {
  if (rank >= 1_000_000) return `~${Math.round(rank / 1_000_000)}M`;
  if (rank >= 1_000) return rank.toLocaleString("en-US");
  return String(rank);
}

export function formatPercent(value: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function mapApiToStats(data: StatsApiResponse): LeetCodeStats {
  return {
    lastUpdated: new Date().toISOString(),
    username: leetcode.username,
    totalSolved: data.totalSolved,
    totalQuestions: data.totalQuestions,
    easySolved: data.easySolved,
    totalEasy: data.totalEasy,
    mediumSolved: data.mediumSolved,
    totalMedium: data.totalMedium,
    hardSolved: data.hardSolved,
    totalHard: data.totalHard,
    acceptanceRate: data.acceptanceRate,
    ranking: data.ranking,
    topicAnalysis: data.data?.topicAnalysis ?? [],
  };
}
