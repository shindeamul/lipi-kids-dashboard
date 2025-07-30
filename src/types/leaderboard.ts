export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  studentGroup: string;
  date: string;
  wordsLearned: number;
  cumulativeTotal: number;
}

export type LeaderboardType = 'all_time' | 'weekly' | 'daily';

export interface LeaderboardResponse {
  type: LeaderboardType;
  data: LeaderboardEntry[];
  lastUpdated: string;
}