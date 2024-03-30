import { establishConnection, closeConnection } from "../config/mongoDbConnection.js"
import { expect } from 'chai'
import Contract from "../models/contract.js"
import DataStorageService from "../dataStorageService.js"
import Track from "../models/track.js"



let mockTrack = {
    title: "test",
    version: "1",
    artist: "mahatma ghandi",
    isrc: "US-S1Z-99-00001",
    "p line": "P Line 1",
    aliases: ["aliases1", "aliases2"],
    contract: 'Contract 1'
}




describe('Contract save', () => {
    
    beforeEach(async () => {
        await Contract.deleteMany({})
    })
    
    it('Should save contract with name value', async () => {
        const result = await DataStorageService.saveContract({ name: 'Contract 2'})
        expect(result).to.be.instanceOf(Contract)
        expect(result.name).to.equal('Contract 2')
    })

    it('Should throw error and not save contract without name value', async () => {
        const result = await DataStorageService.saveContract()
        expect(result.message).to.equal('A name property must be present on the object')      
    })

})

describe('Track Save', () => {

    beforeEach(async () => {
        await Contract.deleteMany({})
        await Track.deleteMany({})
    })
    

    it('Should save Track with no contract association if there is no contract property on the data object', async () => {
        const tempTrack = { ...mockTrack }
        delete tempTrack.contract
        const result = await DataStorageService.saveTrack(tempTrack)
        expect(result).to.not.have.key('contractId')
        expect(result).to.be.instanceOf(Track)
    })


    it('Should save Track with contract association if a contract property exists on the data object that also exists in the contract collection', async () => {
        const savedContract = await new Contract({ name: mockTrack.contract }).save()
        const result = await DataStorageService.saveTrack(mockTrack)
        expect(result).to.be.instanceOf(Track)
        expect(result.toObject().contractId.toString()).to.equal(savedContract._id.toString())
    })

    it('Should throw error and not save Track if a contract property exists on the data object, but the contract does not exist in the contract collection', async () => { 
        const result = await DataStorageService.saveTrack({...mockTrack, contract: "Contract 4"})
        expect(result.message).to.equal(`The specified contract named "Contract 4" cannot be found in the contract collection`)     
    })


})

