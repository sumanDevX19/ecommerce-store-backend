const mongoose = require('mongoose');
const dbgr = require('debug')("development:mongoose");
const config = require('config');
// Have to set environment variable in terminal for getting log from debug module
// export DEBUG=development:*
// export NODE_ENV=development




mongoose
.connect(`${config.get('MONGODB_URI')}theleathervault`)
.then(()=>{
    dbgr('Connected to Mongo DB');
    
})
.catch((err)=>{
    dbgr('Error connecting to MongoDB',err);
    process.exit(1);  // if error exit with code 1 for failure to connect to db.
})

module.exports = mongoose.connection;