import React from 'react';
import { MousePointerClick, Link } from 'lucide-react';

const AnalyticsCards = ({ totalLinks, totalClicks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
    </div>
  );
};

export default AnalyticsCards;
