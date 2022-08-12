import axios from 'axios';

const BASE_URL = 'https://todos-project-api.herokuapp.com';
const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjA1NzgyODJ9.pMq6gr0Q1qNR9m2-ANl_kF4RpoAlC2F6nwSc6q9vfVA';

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: TOKEN
  },
  timeout: 180000
});
