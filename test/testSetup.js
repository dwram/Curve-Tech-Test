import { establishConnection, closeConnection } from "../config/mongoDbConnection.js";

before(async function() {
    console.log('Establishing global test database connection...');
    await establishConnection();
  });
  
after(async function() {
    console.log('Closing global test database connection...');
    await closeConnection();
});