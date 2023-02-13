const Client= require('./Structures/Client');
const mongoose = require('mongoose');
const dbOptions = {
    useNewUrlParser: true,
    autoIndex: false,
    connectTimeoutMS: 10000,
    family: 4,
    useUnifiedTopology: true,
  
   };  
require("dotenv").config();

const client = new Client();
client.start(process.env.TOKEN);


mongoose.connect(process.env.DB, dbOptions);
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', () => {
  console.log('[DB] DATABASE CONNECTED');
});
mongoose.connection.on('err', (err) => {
  console.log(`Mongoose connection error: \n ${err.stack}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});



process.on('unhandledRejection', error => {
  if (error.code === '10008' || error.code === '10062') return;
  console.log(error.stack);
});
process.on('uncaughtException', (err, origin) => {
  console.log(err, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err, origin);
});