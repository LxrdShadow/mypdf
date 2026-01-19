const axios = require("axios");
const { STIRLING_API_URL, STIRLING_API_KEY } = require("../../config/env");

const api = axios.create({
    baseURL: STIRLING_API_URL,
});

api.interceptors.request.use((config) => {
    config.headers["X-API-KEY"] = STIRLING_API_KEY;
    return config;
});

module.exports = api;
