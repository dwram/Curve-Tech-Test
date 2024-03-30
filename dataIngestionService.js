import XLSX from 'xlsx';

class DataIngestionService {

    static hasValidProperties({ title, version = '', artist = '', isrc, pLine = '', aliases = [''], originalRowNumber = ''}) {
        if(!title || !isrc) {
            return new Error('Please make sure you have a title and isrc property')
        }

        if(typeof title !== 'string' || 
            typeof version !== 'string' ||
            typeof artist !== 'string' ||
            typeof isrc !== 'string' ||
            typeof pLine !== 'string') {     
                const error = new Error([
                    { name: "title", value: title}, 
                    { name: "version", value: version }, 
                    { name: "artist", value: artist }, 
                    { name: "isrc", value: isrc }, 
                    { name: "pLine", value: pLine }]
                    .filter(variable => typeof variable.value !== 'string').reduce((sentence, field) => {
                        sentence += `Field ${field.name} with value ${field.value} is not a string, it is of type ${typeof field.value}\n`
                        return sentence
                    }, ""))
                throw error       
        }

        if(typeof aliases !== 'object' || aliases.length > 0 && typeof aliases === 'object' && !aliases.every(alias => typeof alias === 'string')) {
            throw new Error(`Please check aliases. The value must be an array containing elements of strings`)
        }

        return true

    }

    static readXlsxFileToJson(filePath, validationService = DataIngestionService) {
        // todo: deal with edge case if file is not xlsx
        const workbook = XLSX.readFile(filePath)
        const sheetName = workbook.SheetNames[0]
        const workSheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(workSheet, { defval: ""})
        return XLSX.utils.sheet_to_json(workSheet, { defval: ""})
        .map((row, index) => Object.keys(row).reduce((object, field) => {
            let fieldValue = row[field]
            object.originalRowNumber = index + 1 // Excel starts from row 1, whereas Node starts from index 0
            if(field.match(/aliases/i)) fieldValue = row[field].split(';').map(alias => alias.trim())
            object[field.toLowerCase()] = fieldValue
            return object
        }, {}))
        .filter(row => validationService.hasValidProperties(row) && row.title && row.isrc)
    }

}

export default DataIngestionService