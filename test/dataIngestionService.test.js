import DataIngestionService from "../dataIngestionService.js";
import { expect } from "chai";
const mockDataFilePath = `test/mockData/Track Import Test.xlsx`

let mockTrack = {
    title: "test",
    version: "1",
    artist: "mahatma ghandi",
    isrc: "US-S1Z-99-00001",
    "p line": "P Line 1",
    aliases: ["aliases1", "aliases2"]
}

describe('Data Ingestion Service validation', () => {

    beforeEach(() => {
        mockTrack = {
            title: "test",
            version: "1",
            artist: "mahatma ghandi",
            isrc: "US-S1Z-99-00001",
            "p line": "P Line 1",
            aliases: ["aliases1", "aliases2"]
        }
    })

    it('Should successfully validate a track with a title (string), version (string), artist (string), isrc (string), p line (string) and alias ([]string)', () => {
        expect(DataIngestionService.hasValidProperties(mockTrack)).to.equal(true)
    })

    it('Should successfully validate if an object is provided with the minimum required title and isrc', () => {
        expect(DataIngestionService.hasValidProperties({ title: mockTrack.title, isrc: mockTrack.isrc })).to.equal(true)
    })


    it('Should return false if the title is missing', () => {
        delete mockTrack.title
        try {
            throw DataIngestionService.hasValidProperties(mockTrack)
        } catch(error) {
            expect(error.message.trim()).to.include('Please make sure you have a title and isrc property')
        }
    })

    it('Should return false if the isrc is missing', () => {
        delete mockTrack.isrc
        try {
            throw DataIngestionService.hasValidProperties(mockTrack)
        } catch(error) {
            expect(error.message).to.include('Please make sure you have a title and isrc property')
        }
    })

    it('Validation should return false with a title that is not of type string', () => {
        mockTrack.title = 123
        try {
            DataIngestionService.hasValidProperties(mockTrack)
            expect.fail('Expected error was not thrown')
        } catch(error) {
            expect(error.message).to.include('Field title with value 123 is not a string, it is of type number')
        }
    })

    it('Validation should return false with a version that is not of type string', () => {
        mockTrack.version = 1
        try {
            DataIngestionService.hasValidProperties(mockTrack)
            expect.fail('Expected error was not thrown')
        } catch(error) {
            expect(error.message).to.include('Field version with value 1 is not a string, it is of type number')
        }
    })

    it('Validation should return false with a artist that is not of type string', () => {
        mockTrack.version = ["mahatma ghandi"]
        try {
            DataIngestionService.hasValidProperties(mockTrack)
            expect.fail('Expected error was not thrown')
        } catch(error) {
            expect(error.message).to.include('Field version with value mahatma ghandi is not a string, it is of type object')
        }
    })

    it('Validation should return false with an isrc that is not of type string', () => {
        mockTrack.isrc = { code: "US-S1Z-99-00001" }
        try {
            DataIngestionService.hasValidProperties(mockTrack)
            expect.fail('Expected error was not thrown')
        } catch(error) {
            expect(error.message).to.include('Field isrc with value [object Object] is not a string, it is of type object')
        }

    })
    
    it('Validation should return false with a p line that is not of type string', () => {
        mockTrack.pLine = 1
        try {
            DataIngestionService.hasValidProperties(mockTrack)
            expect.fail('Expected error was not thrown')
        } catch(error) {
            expect(error.message).to.include('Field pLine with value 1 is not a string, it is of type number')
        }

    })

    it('Validation should return false with an array with any element that is not of type string', () => {
        mockTrack.aliases = ["aliases1", "alaises2", 1]

        try {
            DataIngestionService.hasValidProperties(mockTrack)
            expect.fail('Expected error was not thrown')
        } catch(error) {
            expect(error.message).to.include('Please check aliases. The value must be an array containing elements of strings')        
        }

    })

})


describe('Data Ingestion Service XLSX reading', () => {
    const data = DataIngestionService.readXlsxFileToJson(mockDataFilePath)

    it('Should successfully ingest only xlsx data that contains title and ISRC and convert ";" delimited aliases to an array values', () => {
        expect(typeof data === 'object').to.equal(true)
        expect(data).to.deep.equal([
            {
            title: 'Track 1',
            version: 'Version 1',
            artist: 'Artist 1',
            id: "",
            isrc: 'ISRC1',
            'p line': 'P Line 1',
            aliases: ["aliases1","aliases2"],
            contract: 'Contract 1',
            originalRowNumber: 2
            },
            {
            id: '',
            title: 'Track 2',
            version: 'Version 2',
            artist: 'Artist 2',
            isrc: 'ISRC2',
            'p line': 'P Line 2',
            aliases: ["aliases11", "aliases22"],
            contract: 'Contract 2',
            originalRowNumber: 3
            }
        ])

    })  
})
