import { LeaderboardEntry, LeaderboardType, LeaderboardScope } from '../types/leaderboard';

const generateSchoolMockData = (type: LeaderboardType): LeaderboardEntry[] => {
  const baseData = [
    {
      studentId: 'STU001',
      studentName: 'Alice Johnson',
      studentGroup: 'Advanced A',
      avatar: 'https://i.pravatar.cc/150?img=1',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 45 : type === 'weekly' ? 280 : 1250,
      cumulativeTotal: 1250
    },
    {
      studentId: 'STU002',
      studentName: 'Benjamin Chen',
      studentGroup: 'Advanced B',
      avatar: 'https://i.pravatar.cc/150?img=2',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 42 : type === 'weekly' ? 265 : 1180,
      cumulativeTotal: 1180
    },
    {
      studentId: 'STU003',
      studentName: 'Carolina Martinez',
      studentGroup: 'Intermediate A',
      avatar: 'https://i.pravatar.cc/150?img=3',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 38 : type === 'weekly' ? 245 : 1120,
      cumulativeTotal: 1120
    },
    {
      studentId: 'STU004',
      studentName: 'David Park',
      studentGroup: 'Advanced A',
      avatar: 'https://i.pravatar.cc/150?img=4',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 35 : type === 'weekly' ? 220 : 1050,
      cumulativeTotal: 1050
    },
    {
      studentId: 'STU005',
      studentName: 'Emma Williams',
      studentGroup: 'Intermediate B',
      avatar: 'https://i.pravatar.cc/150?img=5',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 32 : type === 'weekly' ? 200 : 980,
      cumulativeTotal: 980
    },
    {
      studentId: 'STU006',
      studentName: 'Felix Rodriguez',
      studentGroup: 'Advanced B',
      avatar: 'https://i.pravatar.cc/150?img=6',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 30 : type === 'weekly' ? 185 : 920,
      cumulativeTotal: 920
    },
    {
      studentId: 'STU007',
      studentName: 'Grace Kim',
      studentGroup: 'Intermediate A',
      avatar: 'https://i.pravatar.cc/150?img=7',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 28 : type === 'weekly' ? 175 : 880,
      cumulativeTotal: 880
    },
    {
      studentId: 'STU008',
      studentName: 'Hassan Ahmed',
      studentGroup: 'Beginner A',
      avatar: 'https://i.pravatar.cc/150?img=8',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 25 : type === 'weekly' ? 160 : 820,
      cumulativeTotal: 820
    },
    {
      studentId: 'STU009',
      studentName: 'Isabella Thompson',
      studentGroup: 'Advanced A',
      avatar: 'https://i.pravatar.cc/150?img=9',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 23 : type === 'weekly' ? 145 : 780,
      cumulativeTotal: 780
    },
    {
      studentId: 'STU010',
      studentName: 'Jackson Lee',
      studentGroup: 'Intermediate B',
      avatar: 'https://i.pravatar.cc/150?img=10',
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

const generateGlobalMockData = (type: LeaderboardType): LeaderboardEntry[] => {
  const baseData = [
    {
      studentId: 'STU001',
      studentName: 'Alice Johnson',
      studentGroup: 'Advanced A',
      schoolName: 'Greenwood High School',
      schoolLogo: 'https://i.pravatar.cc/150?img=10',
      avatar: 'https://i.pravatar.cc/150?img=1',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 45 : type === 'weekly' ? 280 : 1250,
      cumulativeTotal: 1250
    },
    {
      studentId: 'STU015',
      studentName: 'Michael Zhang',
      studentGroup: 'Advanced A',
      schoolName: 'Riverside Academy',
      schoolLogo: 'https://i.pravatar.cc/150?img=11',
      avatar: 'https://i.pravatar.cc/150?img=15',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 43 : type === 'weekly' ? 275 : 1230,
      cumulativeTotal: 1230
    },
    {
      studentId: 'STU025',
      studentName: 'Sofia Rodriguez',
      studentGroup: 'Advanced B',
      schoolName: 'Oakwood Elementary',
      schoolLogo: 'https://i.pravatar.cc/150?img=12',
      avatar: 'https://i.pravatar.cc/150?img=25',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 41 : type === 'weekly' ? 270 : 1210,
      cumulativeTotal: 1210
    },
    {
      studentId: 'STU002',
      studentName: 'Benjamin Chen',
      studentGroup: 'Advanced B',
      schoolName: 'Greenwood High School',
      schoolLogo: 'https://i.pravatar.cc/150?img=10',
      avatar: 'https://i.pravatar.cc/150?img=2',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 40 : type === 'weekly' ? 265 : 1180,
      cumulativeTotal: 1180
    },
    {
      studentId: 'STU030',
      studentName: 'Arjun Patel',
      studentGroup: 'Intermediate A',
      schoolName: 'Sunrise International',
      schoolLogo: 'https://i.pravatar.cc/150?img=13',
      avatar: 'https://i.pravatar.cc/150?img=30',
      date: '2024-01-15',
      wordsLearned: type === 'daily' ? 39 : type === 'weekly' ? 260 : 1160,
      cumulativeTotal: 1160
    }
  ];

  return baseData.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
};

export const mockLeaderboardAPI = async (type: LeaderboardType, scope: LeaderboardScope = 'school'): Promise<LeaderboardEntry[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (scope === 'global') {
    return generateGlobalMockData(type);
  }
  
  return generateSchoolMockData(type);
};