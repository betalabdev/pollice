export default {
    env: process.env.NODE_ENV || "local",
    clientUrl: process.env.CLIENT_URL || "https://127.0.0.1:8080",
    serverUrl: process.env.SERVER_URL || "https://127.0.0.1:3000",
}