import { establishConnection, close } from "../config/mongoDbConnection.js"
import { expect } from 'chai'
import Track from '../models/track.js'
import XLSX from 'xlsx';
const mockDataPath = `test/mockData/Track Import Test.xlsx`

before(() => {
    establishConnection()
})

after(async () => {
    await close()
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