import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import LeaderboardPage from './components/LeaderboardPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <LeaderboardPage sidebarOpen={sidebarOpen} />
    </div>
  );
}

export default App;