import mongoose from 'mongoose'

const MONGODB_DATABASE_URI = process.env.MONGODB_DATABASE_URI || "mongodb://localhost:27017/myDatabase"

async function establishConnection() {
    try { 
        await mongoose.connect(MONGODB_DATABASE_URI)
    } catch (err) {
        console.error(err)
    }

}

async function closeConnection() {
    try {
        await mongoose.connection.close()
    } catch (err) {
        console.error(err)
    }

}

export { establishConnection, closeConnection }