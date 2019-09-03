module.exports = {
    env: process.env.NODE_ENV || "local",
    port: process.env.PORT || '3000',
    mongodbUrl: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/test',
    baseUrl: process.env.BASE_URL || "http://127.0.0.1",
    corsWhitelist: [],
}