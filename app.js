const express = require('express');
const app = express();

const path = require('path')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()

// Import mongo database connection
const dbConn = require('./config/mongoose.connection')


// Import routes
const usersRoutes = require('./routes/usersRoutes')
const ownersRoutes = require('./routes/ownersRoutes')
const productsRoutes = require('./routes/productsRoutes')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

// use routes middleware
app.use('/users', usersRoutes);
app.use('/owners', ownersRoutes);
app.use('/products', productsRoutes);



app.get('/', (req, res) => {
    res.send("This is a Dummy response")

})

app.listen(process.env.PORT, (err) => {
    console.log(`Server is Listening Port:${process.env.PORT}`);

})



