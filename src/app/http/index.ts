import axios from "axios";
import { parseCookies } from "nookies";

export const API_URL = `https://apark.dvg-project.com`;

const $api = axios.create({
    baseURL: API_URL + "/api",
});

$api.interceptors.request.use((config) => {
    const cookies = parseCookies();
    config.headers.Authorization = `Bearer ${cookies.token}`;
    return config;
});

export default $api;
