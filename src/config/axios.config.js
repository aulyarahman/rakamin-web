import axios from 'axios';

const BASE_URL = 'https://todos-project-api.herokuapp.com';
const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjU5MTcyOTB9.da7riNZ7x5pu_IRz-xEkvbtVD5eIxLVdE9G2fFK0zdU';

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: TOKEN
  },
  timeout: 180000
});
