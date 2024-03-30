
import { closeConnection, establishConnection } from "./config/mongoDbConnection.js"
import DataIngestionService from "./dataIngestionService.js"
import DataStorageService from "./dataStorageService.js"
import customErrorHandler from "./utils/errorHandler.js"

const errors = []

async function main() {

    try {
        establishConnection()
        const dataFilePath = process.env.DATA_FILE_PATH || process.argv[2] || `test/mockData/Track Import Test.xlsx` || null
        const ingestedTrackDataJson = DataIngestionService.readXlsxFileToJson(dataFilePath)
        await DataStorageService.saveContract({ name: "Contract 1" })
        for( const rowOfTrackData of ingestedTrackDataJson) {
            await DataStorageService.saveTrack(rowOfTrackData)  
        }
    } catch (error) {
        errors.push(error)
    } finally {
        closeConnection()
    }

    console.log('Printing errors...\n')
    for(const [index, error] of customErrorHandler.getAllErrors().entries()) {
        console.error(`Error #${index+1}:`, error)
    }
 
}

main();

process.on('exit', closeConnection);

// Catches ctrl+c event
process.on('SIGINT', () => {
  console.log('Process interrupted.');
  closeConnection();
  process.exit(1); // exit with a 'failure' code
});

// Catches "kill pid"
process.on('SIGUSR1', closeConnection);
process.on('SIGUSR2', closeConnection);

// Catches uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  closeConnection();
  process.exit(1); // exit with a 'failure' code
});