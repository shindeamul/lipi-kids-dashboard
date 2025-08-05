import React from 'react';
import { 
  Home, 
  Folder, 
  Trophy, 
  MessageCircle, 
  Grid3X3, 
  Bell, 
  Settings,
  BookOpen,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: 'dashboard' | 'leaderboard';
  onPageChange: (page: 'dashboard' | 'leaderboard') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, currentPage, onPageChange }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      active: currentPage === 'dashboard', 
      disabled: false,
      onClick: () => onPageChange('dashboard')
    },
    { icon: Folder, label: 'Folder', active: false, disabled: true },
    { 
      icon: Trophy, 
      label: 'Leaderboard', 
      active: currentPage === 'leaderboard', 
      disabled: false,
      onClick: () => onPageChange('leaderboard')
    },
    { icon: MessageCircle, label: 'Chat', active: false, disabled: true },
    { icon: Grid3X3, label: 'Apps', active: false, disabled: true },
    { icon: Bell, label: 'Notifications', active: false, disabled: true },
  ];

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md border border-gray-200"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              {/* <BookOpen className="w-5 h-5 text-white" /> */}
              <img src="/public/assets/logo.jpg" alt="LipiKids Logo" className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900">LipiKids</span>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <p className="font-medium">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.onClick}
                  disabled={item.disabled}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    item.active
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : item.disabled
                      ? 'text-gray-400 cursor-not-allowed opacity-50'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.disabled && (
                    <span className="ml-auto text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">
                      Soon
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-2">
            <button
              disabled
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 cursor-not-allowed opacity-50 rounded-lg transition-colors text-left"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
              <span className="ml-auto text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">
                Soon
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;