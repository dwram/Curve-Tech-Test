import { expect } from 'chai'
import Track from '../models/track.js'
import Contract from "../models/contract.js"

const contract = 'Contract 1'

const mockTrack = {
    title: "test",
    version: "1",
    artist: "mahatma ghandi",
    isrc: "US-S1Z-99-00001",
    "p line": "P Line 1",
    aliases: ["aliases1", "aliases2"],
    contract
}

describe('Track Model: Document creation', () => {

    beforeEach(async () => {
        await new Contract({ name: contract })
    })
    
    afterEach(async () => {
        await Contract.deleteMany({})
        await Track.deleteMany({})
    })
    
    it('It should save the Track document when a contract name exists and contract with a matching name exists', async () => {
        const newTrack = await new Track(mockTrack).save()
        expect(newTrack).to.be.an.instanceof(Track)
    })

    it('It should split all ";" limited aliases into seperate values into a string array', async () => {
        const mockAliases = "aliases:1111;aliases:2222;aliases;3333"
        mockTrack.aliases = mockAliases
        const newTrack = await new Track(mockTrack).save();
        for(const alias of newTrack.aliases) {
            expect(mockAliases.split(';').some(_mockAlias => _mockAlias === alias)).to.be.true
        }
    })
    
    it('It should be unsuccessful to create a track when missing a title property', async () => {
        delete mockTrack.title
        try {
            await new Track(mockTrack).save()
            expect.fail('Expected Validation error, but none was thrown')
        } catch(error) {
            expect(error.name).to.equal('ValidationError')
            expect(error.message).to.equal('Track validation failed: title: Path `title` is required.')
        }
    })

    it('It should be unsuccessful to create a track when missing a isrc property', async () => {
        mockTrack.title = "test"
        delete mockTrack.isrc
        try {
            await new Track(mockTrack).save()
            expect.fail('Expected Validation error, but none was thrown')
        } catch(error) {
            expect(error.name).to.equal('ValidationError')
            expect(error.message).to.equal('Track validation failed: isrc: Path `isrc` is required.')
        }

    })
    
})