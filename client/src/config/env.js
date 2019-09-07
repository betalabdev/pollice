export default {
    env: process.env.NODE_ENV || "local",
    clientUrl: process.env.CLIENT_URL || "https://127.0.0.1:8080",
    serverUrl: process.env.SERVER_URL || "https://127.0.0.1:3000",
    secretKey: process.env.SECRET_KEY || "481318809056-v7u1644mckbkhllsr6hi6igflsp3ag52.apps.googleusercontent.com",
    jwtSeed: process.env.JWT_SEED || 'gAuthSecretToken',
}