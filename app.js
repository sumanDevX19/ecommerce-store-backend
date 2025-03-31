const express = require('express');
const app = express();
const expressSession = require('express-session');
const flash = require('connect-flash');
const path = require('path')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()


// Import mongo database connection
const dbConn = require('./config/mongoose.connection')


// Import routes
const usersRoutes = require('./routes/usersRoutes')
const ownersRoutes = require('./routes/ownersRoutes')
const productsRoutes = require('./routes/productsRoutes')
const main = require('./routes/index')




// Setting Up Middlewares
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(expressSession({ 
    secret: process.env.JWT_KEY, 
    resave: false, 
    saveUninitialized: false }));
app.use(flash())
    
// use routes middleware
app.use('/users', usersRoutes);
app.use('/owners', ownersRoutes);
app.use('/products', productsRoutes);
app.use('/', main);



app.listen(process.env.PORT, (err) => {
    console.log(`Server is Listening Port:${process.env.PORT}`);

})



