import axios from 'axios';

/**
 * Axios instance for backend API. baseURL uses relative /api so Vite proxy (dev)
 * forwards to backend (localhost:3333). For production, set VITE_API_BASE_URL or
 * use same origin.
 */
const baseURL =
  typeof import.meta.env !== 'undefined' && import.meta.env?.VITE_API_BASE_URL != null
    ? String(import.meta.env.VITE_API_BASE_URL)
    : '/api';

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});
