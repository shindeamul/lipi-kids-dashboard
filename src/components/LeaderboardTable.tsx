import React from 'react';
import { LeaderboardEntry } from '../types/leaderboard';
import LeaderboardCard from './LeaderboardCard';

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
        <p className="text-gray-600 text-lg">No leaderboard data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((entry) => (
        <LeaderboardCard key={entry.studentId} entry={entry} />
      ))}
    </div>
  );
};

export default LeaderboardTable;