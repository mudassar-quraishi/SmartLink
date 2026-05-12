import React from 'react';
import { Link2, Scissors, BarChart3, Settings, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const navLinkClasses = ({ isActive }) => 
  `group flex items-center px-4 py-3 text-sm font-medium rounded-xl border transition-all ${
    isActive 
      ? 'bg-white/10 text-white border-white/5' 
      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border-transparent'
  }`;

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-blue-500/30">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 bg-gray-900/50 backdrop-blur-xl hidden md:flex flex-col">
          <div className="flex-shrink-0 px-6 py-8 flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-2 rounded-xl">
              <Link2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">SmartLink</span>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <NavLink to="/" className={navLinkClasses} end>
              <Scissors className="mr-3 h-5 w-5 text-blue-400" />
              Overview
            </NavLink>
            <NavLink to="/analytics" className={navLinkClasses}>
              <BarChart3 className="mr-3 h-5 w-5 group-hover:text-purple-400 transition-colors" />
              {user.role === 'ADMIN' ? 'Global Analytics' : 'Analytics'}
            </NavLink>
          </nav>
          
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/5 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold">
                 {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.role}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
