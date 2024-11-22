import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://bothub.chat/api/v2/openai/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});
