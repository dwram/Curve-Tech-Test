import mongoose from 'mongoose'

const MONGODB_DATABASE_URI = process.env.MONGODB_DATABASE_URI || "mongodb://localhost:27017/myDatabase"

async function establishConnection() {
    try { 
        await mongoose.connect(MONGODB_DATABASE_URI)
    } catch (err) {
        console.error(err)
    }

}

const close = mongoose.close

export { establishConnection, close }