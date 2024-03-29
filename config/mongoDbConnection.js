const mongoose = require('mongoose')

const MONGODB_DATABASE_URI = process.env.MONGODB_DATABASE_URI || "mongodb://localhost:27017/myDatabase"

async function establishConnection() {
    try { 
        await mongoose.connect(MONGODB_DATABASE_URI, {
            useNewUrlPaser: true, // New connection string parser
            useUnifiedTopology: true // removing server discovery and monitoring deprecation warning
        })
    } catch (err) {
        console.error(err)
    }

}