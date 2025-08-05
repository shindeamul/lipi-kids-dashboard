import React, { useState } from 'react';
import { Calendar, Download, Globe, School } from 'lucide-react';
import { LeaderboardType, LeaderboardScope } from '../types/leaderboard';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useAuth } from '../contexts/AuthContext';
import LeaderboardTabs from './LeaderboardTabs';
import LeaderboardTable from './LeaderboardTable';

interface LeaderboardPageProps {
  sidebarOpen: boolean;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ sidebarOpen }) => {
  const [activeTab, setActiveTab] = useState<LeaderboardType>('all_time');
  const [activeScope, setActiveScope] = useState<LeaderboardScope>('school');
  const { user } = useAuth();
  const { data, loading, error } = useLeaderboard(activeTab, activeScope);

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

  const getScopeTitle = (scope: LeaderboardScope) => {
    if (scope === 'global') {
      return 'Global Leaderboard - Top Students from All Schools';
    }
    return user?.role === 'schooladmin' 
      ? `${user.schoolName} - School Leaderboard` 
      : 'School Leaderboard';
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleExport = () => {
    // TODO: Implement CSV/PDF export functionality
    console.log('Exporting leaderboard data...');
    alert('Export functionality will be implemented soon!');
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
          
          {/* Scope Selector */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveScope('school')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeScope === 'school'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <School className="w-4 h-4" />
                <span>School Level</span>
              </button>
              <button
                onClick={() => setActiveScope('global')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeScope === 'global'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Global Level</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="flex items-center space-x-4">
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <div className="text-xs sm:text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl">
          <div className="mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
              <div className="flex items-center space-x-3 mb-2">
                {activeScope === 'global' ? (
                  <Globe className="w-6 h-6 text-purple-600" />
                ) : (
                  <School className="w-6 h-6 text-blue-600" />
                )}
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {getScopeTitle(activeScope)}
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                {getTabTitle(activeTab)} - {activeScope === 'global' 
                  ? 'Competing students from all schools worldwide' 
                  : activeScope === 'school' && user?.role === 'schooladmin'
                    ? `Top performing students in ${user.schoolName}`
                    : 'Top performing students in this school'
                }
              </p>
            </div>
            <h3 className="text-md font-medium text-gray-700 mb-2">
              {getTabTitle(activeTab)}
            </h3>
          </div>
          
          <LeaderboardTable data={data} loading={loading} error={error} scope={activeScope} />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;