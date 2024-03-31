import mongoose, { Schema } from 'mongoose'

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
    } else if(Array.isArray(this.aliases) && typeof this.aliases[0] === 'string') {
        this.aliases = this.aliases.reduce((array, element) => array.concat(element.split(';')), [])   
    }   
    next()

})

const Track = mongoose.model('Track', trackSchema)

export default Track