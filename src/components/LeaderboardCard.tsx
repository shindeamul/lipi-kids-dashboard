import React from 'react';
import { LeaderboardEntry } from '../types/leaderboard';
import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ entry }) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-red-400 to-red-600';
      case 2:
        return 'from-blue-400 to-blue-600';
      case 3:
        return 'from-green-400 to-green-600';
      case 4:
        return 'from-orange-400 to-orange-600';
      case 5:
        return 'from-pink-400 to-pink-600';
      default:
        return 'from-purple-400 to-purple-600';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-white" />;
      case 2:
        return <Medal className="w-6 h-6 text-white" />;
      case 3:
        return <Award className="w-6 h-6 text-white" />;
      default:
        return <span className="text-xl font-bold text-white">{rank}</span>;
    }
  };

  const getStudentAvatar = (studentId: string) => {
    // Generate consistent avatar based on student ID
    // const avatarId = parseInt(studentId.replace(/\D/g, '')) % 70 + 1;
    return `https://img.lipi.games/lipi_kids/nature/morning.jpg`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className={`bg-gradient-to-r ${getRankColor(entry.rank)} p-4`}>
        <div className="flex items-center justify-between text-white relative">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              {getRankIcon(entry.rank)}
            </div>
            <div>
              <h3 className="font-bold text-lg">{entry.studentName}</h3>
              <p className="text-white/80 text-sm">ID: {entry.studentId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold">{entry.wordsLearned}</div>
              <div className="text-white/80 text-sm">words learned</div>
            </div>
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/30 shadow-lg">
              <img 
                src={getStudentAvatar(entry.studentId)} 
                alt={entry.studentName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(entry.studentName)}&background=ffffff&color=000000&size=150`;
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Group:</span>
            <p className="font-medium text-gray-900">{entry.studentGroup}</p>
          </div>
          <div>
            <span className="text-gray-500">Date:</span>
            <p className="font-medium text-gray-900">{formatDate(entry.date)}</p>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-500">Cumulative Total:</span>
            <p className="font-bold text-lg text-blue-600">{entry.cumulativeTotal.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;