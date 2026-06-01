const API_BASE = 'http://localhost:8080';

export const shortenUrl = async (url) => {
  const response = await fetch(`${API_BASE}/api/shorten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) throw new Error('Failed to shorten url');
  return response.json();
};

export const getAnalytics = async () => {
  const response = await fetch(`${API_BASE}/api/analytics`);
  if (!response.ok) throw new Error('Failed to fetch analytics');
  return response.json();
};
