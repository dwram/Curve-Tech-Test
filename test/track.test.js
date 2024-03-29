import { establishConnection, closeConnection } from "../config/mongoDbConnection.js"
import { expect } from 'chai'
import Track from '../models/track.js'

before(() => {
    establishConnection()
})

after(() => {
    closeConnection()
})

describe('Track creation', () => {

    beforeEach(async () => {
        await Track.deleteMany({})
    })

    it('Should create track successfully', () => {

    })

    it('If the contract name exists, and a contract is not found, it should return an error stating the contract cannot be found', () => {

    })

})