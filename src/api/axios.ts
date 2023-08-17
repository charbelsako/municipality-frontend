import axios from 'axios';
import env from 'react-dotenv';

export default axios.create({
  baseURL: env.BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: env.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
