import { establishConnection, closeConnection } from "../config/mongoDbConnection.js"
import { expect } from 'chai'
import Contract from '../models/contract.js'


after(async () => {
    await Contract.deleteMany({})
})

describe("Contract creation", () => {

    it("Should create contract successfully", async () => {
        const newContract = new Contract({ name: 'Contract 1'})
        await newContract.save().then((newContractDocument) => {
            expect(newContractDocument.isNew).to.be.false
            expect(newContractDocument.name).to.equal('Contract 1')
        })
    })

})