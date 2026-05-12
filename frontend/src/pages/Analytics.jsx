import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../services/api';
import AnalyticsCards from '../components/AnalyticsCards';
import LinksTable from '../components/LinksTable';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({ totalLinks: 0, totalClicks: 0, recentLinks: [] });

  const loadData = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Analytics</h1>
        <p className="text-gray-400 mt-2">In-depth view of your link performance over time.</p>
      </div>
      
      <AnalyticsCards totalLinks={analytics.totalLinks} totalClicks={analytics.totalClicks} />

      {/* Unique Visual Chart to differentiate from the Overview page */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8 mt-8">
        <h2 className="text-xl font-semibold mb-6">Clicks on Recent Links</h2>
        {analytics.recentLinks.length > 0 ? (
          <>
            <div className="h-48 md:h-64 flex items-end gap-2 sm:gap-6 border-b border-l border-white/10 pb-2 pl-2">
              {analytics.recentLinks.slice(0, 7).map((link, index) => {
                const maxClicks = Math.max(...analytics.recentLinks.map((l) => l.clicks), 1);
                const height = (link.clicks / maxClicks) * 100;
                
                return (
                  <div key={index} className="flex flex-col flex-1 items-center justify-end h-full group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-8 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {link.clicks} clicks
                    </div>
                    <div 
                      className="w-full bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-md transition-all duration-500 group-hover:opacity-80" 
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 sm:gap-6 mt-2 text-xs md:text-sm text-gray-400 pl-2">
              {analytics.recentLinks.slice(0, 7).map((link, index) => (
                <div key={index} className="flex-1 text-center truncate">
                  {link.shortCode}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-lg">
            No links active yet to display data.
          </div>
        )}
      </div>
      
      <h2 className="text-xl font-semibold mb-4 mt-8">Historical Links Traffic</h2>
      <LinksTable links={analytics.recentLinks} />
    </>
  );
};

export default Analytics;
