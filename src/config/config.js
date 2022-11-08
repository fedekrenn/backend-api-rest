const config = {
    puerto: process.env.PORT || 8080,
    fileSystem: {
        path: './src/DB'
    },
    mongoDB: {
        host: process.env.DB_URL_MONGO || 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    }
}

module.exports = config;