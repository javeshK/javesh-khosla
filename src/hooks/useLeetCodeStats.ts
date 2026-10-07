import { useEffect, useState } from "react";
import seedStats from "../data/leetcode-stats.json";
import { leetcode, mapApiToStats, type LeetCodeStats } from "../data/leetcode";

export function useLeetCodeStats() {
  const [stats, setStats] = useState<LeetCodeStats>(seedStats);
  const [isLive, setIsLive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const response = await fetch(leetcode.statsApiUrl);
        if (!response.ok) throw new Error("stats fetch failed");
        const data = await response.json();
        if (cancelled) return;
        setStats(mapApiToStats(data));
        setIsLive(true);
      } catch {
        if (!cancelled) setIsLive(false);
      } finally {
        if (!cancelled) setIsRefreshing(false);
      }
    }

    refresh();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, isLive, isRefreshing };
}
