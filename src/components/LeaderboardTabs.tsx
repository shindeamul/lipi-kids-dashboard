import React from 'react';
import { LeaderboardType } from '../types/leaderboard';

interface LeaderboardTabsProps {
  activeTab: LeaderboardType;
  onTabChange: (tab: LeaderboardType) => void;
}

const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all_time' as LeaderboardType, label: 'All Time' },
    { id: 'weekly' as LeaderboardType, label: 'Weekly' },
    { id: 'daily' as LeaderboardType, label: 'Daily' },
  ];

  return (
    <div className="flex flex-wrap sm:flex-nowrap space-x-1 bg-gray-100 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-3 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default LeaderboardTabs;