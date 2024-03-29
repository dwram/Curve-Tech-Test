import { establishConnection } from "./config/mongoDbConnection.js"
import XLSX from 'xlsx';

class DataIngestionService {

    static hasValidProperties({ title, version = '', artist = '', isrc, "p line": pLine = '', aliases = ['']}) {
        if(!title || !isrc) {
            return false
        }

        if(typeof title !== 'string' || 
            typeof version !== 'string' ||
            typeof artist !== 'string' ||
            typeof isrc !== 'string' ||
            typeof pLine !== 'string') {
            return false
        }

        if(aliases.length > 0 && typeof aliases != 'object' && !aliases.every(alias => typeof alias === 'string')) {
            return false
        }

        return true

    }

    static readXlsxFileToJson(filePath, validationService = DataIngestionService) {
        const workbook = XLSX.readFile(filePath)
        const sheetName = workbook.SheetNames[0]
        const workSheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(workSheet, { defval: ""})
        return XLSX.utils.sheet_to_json(workSheet, { defval: ""})
        .map(row => Object.keys(row).reduce((object, field) => {
            let fieldValue = row[field]
            if(field.match(/aliases/gi)) fieldValue = row[field].split(';').map(alias => alias.trim())
            object[field.toLowerCase()] = fieldValue
            return object
        }, {}))
        .filter(row => validationService.hasValidProperties(row) )
    }

}

export default DataIngestionService