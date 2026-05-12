import React from 'react';
import { Copy, Navigation, Clock } from 'lucide-react';

const LinksTable = ({ links = [] }) => {
  const handleCopy = (shortCode) => {
    navigator.clipboard.writeText(`http://localhost:8080/${shortCode}`);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-medium text-gray-100">Recent Links</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-black/20 text-gray-400">
            <tr>
              <th className="px-6 py-4 font-medium uppercase tracking-wider">Original URL</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider">Short Code</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider">Clicks</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {links.map((link) => (
              <tr key={link.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 max-w-[200px] truncate text-gray-300" title={link.originalUrl}>
                  {link.originalUrl}
                </td>
                <td className="px-6 py-4">
                  <a href={`http://localhost:8080/${link.shortCode}`} target="_blank" rel="noreferrer" className="text-blue-400 font-medium hover:underline flex items-center gap-2">
                    {link.shortCode} <Navigation className="h-3 w-3" />
                  </a>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {link.clicks}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleCopy(link.shortCode)}
                    className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {links.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No links created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinksTable;
