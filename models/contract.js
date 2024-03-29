import mongoose, { Schema } from 'mongoose'

const contractSchema = new Schema({
    name: { type: String, required: true }
})

const Contract = mongoose.model('Contract', contractSchema)

export default Contract