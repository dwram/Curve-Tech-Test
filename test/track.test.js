import { expect } from 'chai'
import Track from '../models/track.js'
import Contract from "../models/contract.js"

const contract = 'Contract 1'


let mockTrack = {
    title: "test",
    version: "1",
    artist: "mahatma ghandi",
    isrc: "US-S1Z-99-00001",
    "p line": "P Line 1",
    aliases: ["aliases1", "aliases2"],
    contract
}


describe('Track creation', () => {

    beforeEach(async () => {
        await new Contract({ name: contract })
    })
    
    afterEach(async () => {
        await Contract.deleteMany({})
        await Track.deleteMany({})
    })
    


    it('Should save the document when a contract name exists and contract is found', async () => {
        const newTrack = await new Track(mockTrack).save()
        expect(newTrack).to.be.an.instanceof(Track)
    })
  
    
})