module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'mySecretKey',
    DB:{
        URI: process.env.APP_MONGODB_URI || 'mongodb://127.0.0.1/api-turismo'
    }
}