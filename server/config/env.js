module.exports = {
    env: process.env.NODE_ENV || "local",
    port: process.env.PORT || '3000',
    mongodbUrl: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/test',
    clientUrl: process.env.CLIENT_URL || "https://127.0.0.1:8080",
    serverUrl: process.env.SERVER_URL || "https://127.0.0.1:3000",
    corsWhitelist: [],
    clientId: process.env.CLIENT_ID || "481318809056-v7u1644mckbkhllsr6hi6igflsp3ag52.apps.googleusercontent.com",
    jwtSeed: process.env.JWT_SEED || 'gAuthSecretToken',
}