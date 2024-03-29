const { Schema, Model }= require('mongoose')

const contractSchema = new Schema({
    name: { type: String, required: true }
})