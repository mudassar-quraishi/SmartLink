import React from 'react';
import { Link2, Scissors, BarChart3 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navLinkClasses = ({ isActive }) => 
  `group flex items-center px-4 py-3 text-sm font-medium rounded-xl border transition-all ${
    isActive 
      ? 'bg-white/10 text-white border-white/5' 
      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border-transparent'
  }`;

const DashboardLayout = ({ children }) => {
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
              Analytics
            </NavLink>
          </nav>
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
