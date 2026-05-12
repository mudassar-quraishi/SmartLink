import React, { useState } from 'react';
import { Link2, Copy, Check, ExternalLink } from 'lucide-react';

const UrlInput = ({ onShorten }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setIsLoading(true);
    try {
      const data = await onShorten(url);
      setShortUrl(data.shortUrl);
      setMessage(data.message || 'This link will expire in 24 hours');
      setUrl('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      
      <h2 className="text-xl md:text-2xl font-semibold mb-6">Shorten New URL</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Link2 className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="url"
            required
            className="w-full pl-12 pr-4 py-4 bg-black/40 border border-gray-700/50 focus:border-blue-500 rounded-xl text-gray-100 placeholder-gray-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            placeholder="Paste your long link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all disabled:opacity-75"
        >
          {isLoading ? 'Shortening...' : 'Generate'}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3 w-full truncate">
            <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
              <Check className="h-5 w-5 text-blue-400" />
            </div>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-medium hover:text-blue-300 truncate">
              {shortUrl}
            </a>
          </div>
          <div className="flex gap-2 w-full sm:w-auto shrink-0">
            <a 
              href={shortUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors"
              title="Open Link"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <button 
              onClick={handleCopy}
              className="px-5 py-3 flex-1 sm:flex-none justify-center bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2 transition-colors font-medium border border-white/5"
            >
              {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlInput;
