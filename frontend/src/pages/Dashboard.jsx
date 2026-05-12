import React, { useEffect, useState } from 'react';
import AnalyticsCards from '../components/AnalyticsCards';
import UrlInput from '../components/UrlInput';
import LinksTable from '../components/LinksTable';
import { getAnalytics, shortenUrl } from '../services/api';

const Dashboard = () => {
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

  const handleShorten = async (url) => {
    const data = await shortenUrl(url);
    await loadData(); // refresh table & numbers
    return data;
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Dashboard</h1>
        <p className="text-gray-400 mt-2">Manage your links and view their performance.</p>
      </div>

      <AnalyticsCards totalLinks={analytics.totalLinks} totalClicks={analytics.totalClicks} />
      
      <div className="mb-10">
        <UrlInput onShorten={handleShorten} />
      </div>

      <LinksTable links={analytics.recentLinks} />
    </>
  );
};

export default Dashboard;
