import axios from 'axios';

const BASE_URL = 'https://todos-project-api.herokuapp.com';
const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjIxMDA1NTR9.p4kLbOIqvIR2ETLuLQmPnzWSR8ZD5ZokzmJmd82k_y0';

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: TOKEN
  },
  timeout: 180000
});
