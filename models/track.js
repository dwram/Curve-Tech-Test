import mongoose, { Schema } from 'mongoose'
import Contract from '../models/contract.js'

const trackSchema = new Schema({
    title: { type: String, required: true },
    version: String,
    artist: String,
    isrc: { type: String, required: true},
    pLine: String,
    aliases: [String],
    contractId: { type: Schema.Types.ObjectId, ref: 'Contract' }
})

trackSchema.pre('save', async function(next) {  

    if(typeof this.aliases === 'string') {
        this.aliases = this.aliases.split(';').map(alias => alias.trim())
    }
    
    next()

})

const Track = mongoose.model('Track', trackSchema)

export default Track