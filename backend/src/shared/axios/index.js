import axios from "axios";
import { STIRLING_API_URL, STIRLING_API_KEY } from "../../config/env.js";

const api = axios.create({
    baseURL: STIRLING_API_URL,
});

api.interceptors.request.use((config) => {
    config.headers["X-API-KEY"] = STIRLING_API_KEY;
    return config;
});

export function readStream(stream) {
    return new Promise((resolve, reject) => {
        let data = "";

        stream.on("data", (chunk) => {
            data += chunk.toString("utf8");
        });

        stream.on("end", () => resolve(data));
        stream.on("error", reject);
    });
}

export default api;
