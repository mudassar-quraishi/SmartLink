import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8080';

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Invalid credentials');
  return response.json();
};

export const signup = async (name, email, password) => {
  const response = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) throw new Error('Could not sign up');
  return response.json();
};

export const shortenUrl = async (url) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id || null;

  const response = await fetch(`${API_BASE}/api/shorten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, userId }),
  });
  if (!response.ok) throw new Error('Failed to shorten url');
  return response.json();
};

export const getAnalytics = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id || null;
  const isAdmin = user?.role === 'ADMIN';

  let query = '';
  if (userId) {
    query = `?userId=${userId}&isAdmin=${isAdmin}`;
  }

  const response = await fetch(`${API_BASE}/api/analytics${query}`);
  if (!response.ok) throw new Error('Failed to fetch analytics');
  return response.json();
};
