import axios from "axios";

const API_BASE_URL = "https://api.ht-techsolutions.com";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Helper for SHA-256 hashing as required by backend
export const hashPassword = async (password: string): Promise<string> => {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
};

// Add interceptor for token if exists in localStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("ht_nexus_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
