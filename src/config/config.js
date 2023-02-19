import dotenv from 'dotenv'

dotenv.config()

export default {
    PORT: process.env.PORT || 8000,
    MONGODB_URI: process.env.MONGODB_URI,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET
}