import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { LeaderboardType } from '../types/leaderboard';
import { useLeaderboard } from '../hooks/useLeaderboard';
import LeaderboardTabs from './LeaderboardTabs';
import LeaderboardTable from './LeaderboardTable';

interface LeaderboardPageProps {
  sidebarOpen: boolean;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ sidebarOpen }) => {
  const [activeTab, setActiveTab] = useState<LeaderboardType>('all_time');
  const { data, loading, error } = useLeaderboard(activeTab);

  const getTabTitle = (tab: LeaderboardType) => {
    switch (tab) {
      case 'all_time':
        return 'All-Time Top 10';
      case 'weekly':
        return 'Weekly Top 10';
      case 'daily':
        return 'Daily Top 10';
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`flex-1 bg-gray-50 min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}`}>
      <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Leaderboard</h1>
            <div className="flex items-center space-x-2 text-gray-600 text-sm sm:text-base">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{getCurrentDate()}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="text-xs sm:text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              {getTabTitle(activeTab)}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {activeTab === 'all_time' && 'Top performing students of all time based on cumulative word learning'}
              {activeTab === 'weekly' && 'Top performing students this week based on words learned'}
              {activeTab === 'daily' && 'Top performing students today based on words learned'}
            </p>
          </div>
          
          <LeaderboardTable data={data} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;