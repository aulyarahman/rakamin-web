import axios from 'axios';

const BASE_URL = 'https://todos-project-api.herokuapp.com';
const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjI3MDEyMjd9.51rGvIzFgXy0YmiZYarySvjnqMo3WJtvGulorsecrt4';

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: TOKEN
  },
  timeout: 180000
});
