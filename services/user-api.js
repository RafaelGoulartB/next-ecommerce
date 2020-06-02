const axios = require('axios');

const api = axios.create({
  baseURL: `${process.env.USER_API_URL}:${process.env.USER_API_PORT}`,
});

export default api;