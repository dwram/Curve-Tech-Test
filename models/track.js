import mongoose, { Schema, Model } from 'mongoose'

const trackSchema = new Schema({
    title: { type: String, required: true },
    version: String,
    arist: String,
    isrc: { type: String, required: true},
    pLine: String,
    aliases: [String],
    contractId: { type: Schema.Types.ObjectId, ref: 'Contract', required: true }
})

trackSchema.pre('save', (next) => {
    if(typeof this.aliases === 'string') {
        this.aliases = this.aliases.split(';').map(alias => alias.trim())
    }
})

const Track = mongoose.model('Track', trackSchema)

export default Track