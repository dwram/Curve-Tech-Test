import { establishConnection, closeConnection } from "../config/mongoDbConnection.js"
import { expect } from 'chai'
import Contract from '../models/contract.js'


after(async () => {
    await Contract.deleteMany({})
})

describe("Contract creation", () => {

    it("Should create contract successfully when the required 'name' prerty on the object exists", async () => {
        const newContract = new Contract({ name: 'Contract 1'})
        await newContract.save().then((newContractDocument) => {
            expect(newContractDocument.isNew).to.be.false
            expect(newContractDocument.name).to.equal('Contract 1')
        })
    })

    it("It should be unsucessful to create a contract when the required 'name' property on the object is missing", async () => {
        const newContract = new Contract({})
        try {
            await newContract.save()
            expect.fail('Expected ValidationError, but not was thrown')
        } catch(error) {
            expect(error.name).to.equal('ValidationError')
            expect(error.message).to.include("Path `name` is required")
        }
    })

})