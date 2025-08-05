export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  studentGroup: string;
  schoolName?: string;
  schoolLogo?: string;
  date: string;
  wordsLearned: number;
  cumulativeTotal: number;
  avatar?: string;
}

export type LeaderboardType = 'all_time' | 'weekly' | 'daily';
export type LeaderboardScope = 'school' | 'global';

export interface LeaderboardResponse {
  type: LeaderboardType;
  scope: LeaderboardScope;
  data: LeaderboardEntry[];
  lastUpdated: string;
  schoolName?: string;
}