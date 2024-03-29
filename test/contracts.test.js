import { establishConnection, closeConnection } from "../config/mongoDbConnection.js"
import { expect } from 'chai'
import Contract from '../models/contract.js'

before(() => {
    establishConnection();
});

after(async () => {
    await Contract.deleteMany({})
    closeConnection();
})

describe("Contract creation", () => {

    const newContract = new Contract({ name: 'Contract 1'})

    it("Should create contract successfully", () => {
        newContract.save().then((newDocument) => {
            expect(newDocument.isNew).to.be.false
        })
    })

})