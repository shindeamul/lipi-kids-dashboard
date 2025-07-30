import { LeaderboardEntry, LeaderboardType } from '../types/leaderboard';

const generateMockData = (type: LeaderboardType): LeaderboardEntry[] => {
  const baseData = [
    {
      studentId: 'STU001',
      studentName: 'Alice Johnson',
      studentGroup: 'Advanced A',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 45 : type === 'weekly' ? 280 : 1250,
      cumulativeTotal: 1250
    },
    {
      studentId: 'STU002',
      studentName: 'Benjamin Chen',
      studentGroup: 'Advanced B',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 42 : type === 'weekly' ? 265 : 1180,
      cumulativeTotal: 1180
    },
    {
      studentId: 'STU003',
      studentName: 'Carolina Martinez',
      studentGroup: 'Intermediate A',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 38 : type === 'weekly' ? 245 : 1120,
      cumulativeTotal: 1120
    },
    {
      studentId: 'STU004',
      studentName: 'David Park',
      studentGroup: 'Advanced A',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 35 : type === 'weekly' ? 220 : 1050,
      cumulativeTotal: 1050
    },
    {
      studentId: 'STU005',
      studentName: 'Emma Williams',
      studentGroup: 'Intermediate B',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 32 : type === 'weekly' ? 200 : 980,
      cumulativeTotal: 980
    },
    {
      studentId: 'STU006',
      studentName: 'Felix Rodriguez',
      studentGroup: 'Advanced B',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 30 : type === 'weekly' ? 185 : 920,
      cumulativeTotal: 920
    },
    {
      studentId: 'STU007',
      studentName: 'Grace Kim',
      studentGroup: 'Intermediate A',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 28 : type === 'weekly' ? 175 : 880,
      cumulativeTotal: 880
    },
    {
      studentId: 'STU008',
      studentName: 'Hassan Ahmed',
      studentGroup: 'Beginner A',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 25 : type === 'weekly' ? 160 : 820,
      cumulativeTotal: 820
    },
    {
      studentId: 'STU009',
      studentName: 'Isabella Thompson',
      studentGroup: 'Advanced A',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 23 : type === 'weekly' ? 145 : 780,
      cumulativeTotal: 780
    },
    {
      studentId: 'STU010',
      studentName: 'Jackson Lee',
      studentGroup: 'Intermediate B',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 20 : type === 'weekly' ? 130 : 750,
      cumulativeTotal: 750
    }
  ];

  return baseData.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
};

export const mockLeaderboardAPI = async (type: LeaderboardType): Promise<LeaderboardEntry[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return generateMockData(type);
};