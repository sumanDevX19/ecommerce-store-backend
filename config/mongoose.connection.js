const mongoose = require('mongoose');


mongoose
.connect(`mongodb://localhost:27017/theleathervault`)
.then(()=>{
    console.log('Connected to Mongo DB');
    
})
.catch((err)=>{
    console.error('Error connecting to MongoDB',err);
    process.exit(1);  // if error exit with code 1 for failure to connect to db.
})

module.exports = mongoose.connection;