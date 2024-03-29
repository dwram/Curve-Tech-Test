const { Schema, Model } = require('mongoose')

const trackSchema = new Schema({
    title: { type: String, required: true },
    version: String,
    arist: String,
    isrc: { type: String, required: true},
    pLine: String,
    aliases: Array,
    contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})