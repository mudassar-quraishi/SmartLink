import React from 'react';
import { MousePointerClick, Link, Activity } from 'lucide-react';

const AnalyticsCards = ({ totalLinks, totalClicks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 rounded-xl">
            <Link className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Links</p>
            <p className="text-3xl font-bold text-gray-100">{totalLinks || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-xl">
            <MousePointerClick className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Clicks</p>
            <p className="text-3xl font-bold text-gray-100">{totalClicks || 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 blur-xl">
           <Activity className="h-32 w-32 text-blue-500" />
        </div>
        <div className="relative z-10">
          <p className="text-gray-300 font-medium mb-1">Status</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-lg text-emerald-400 font-semibold">Systems Nominal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCards;
