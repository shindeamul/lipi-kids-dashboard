import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import LeaderboardPage from './components/LeaderboardPage';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import SchoolAdminDashboard from './components/SchoolAdminDashboard';
import CategoriesManagementPage from './components/CategoriesManagementPage';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'leaderboard' | 'categories'>('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderMainContent = () => {
    if (currentPage === 'leaderboard') {
      return <LeaderboardPage sidebarOpen={sidebarOpen} />;
    }

    if (currentPage === 'categories') {
      return <CategoriesManagementPage />;
    }

    if (user?.role === 'superadmin') {
      return <SuperAdminDashboard />;
    } else {
      return <SchoolAdminDashboard />;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}`}>
        {renderMainContent()}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}
export default App;