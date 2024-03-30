
# Curve Coding Test

## What this application is for?

Create a NodeJS script that will ingest some simple data from a spreadsheet.

## Requirements

1. Node.
2. Node Package Manager (npm).
2. MongoDB service running.


### Environment variables

MONGODB_DATABASE_URI

default: "mongodb://localhost:27017/myDatabase"
Set this to the URI of your mongodb:// service that you want collections populated in.


DATA_FILE_PATH

default: "/test/mockData/Track Import Test.xlsx"
The file path for the xlsx file that will be ingested.

Alternatively, you can provide a CLI argument when executing the application.



## How to run

At CurveTask root directory: 
1. Install dependencies via `npm install`
2. Ensure MongoDB is running via `mongod --dbpath PATH-TO-YOUR-/data-folder`
3. Run the application using `node main` 

3a. Optional: Add path to xlsx file. This will take priority.  
3b. Optional: Add environment variable for MONGODB_DATABASE_URI or DATA_FILE_PATH


## How to run tests

npx mocha test