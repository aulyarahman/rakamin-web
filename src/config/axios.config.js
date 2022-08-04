import axios from 'axios';

const BASE_URL = 'https://todos-project-api.herokuapp.com';
const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NTk5NzkyNzJ9.ZZdIIRRz_QDkuXGlHtVXwBcoTUqk7HBsZSmE3a1QVng';

export const Axios = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    Accept: 'application/json',
    Authorization: TOKEN
  },
  timeout: 180000
});
