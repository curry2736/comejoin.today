console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const tokenTest = require('./routes/tokenTest');
const logout = require('./routes/logout');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const adminDashboard = require('./routes/admin-dashboard')
const clubRush = require('./routes/club-rush')
const signup = require('./routes/signup');
const login = require('./routes/login');
const auth = require('./routes/auth');
const clientDashboard = require('./routes/client-dashboard')
const details = require('./routes/details');
const about = require('./routes/about');
const indexRouter = require('./routes/index')
const company = require('./routes/company');
const forgot = require('./routes/forgot');
const reset = require('./routes/reset');
const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
const favorite = require('./routes/favorite')
const search = require('./routes/search')

const app = express();
const methodOverride = require('method-override')
const port = process.env.PORT || 3000;
const expressLayouts = require('express-ejs-layouts');

app.use(methodOverride('_method'))
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(express.json());
app.use('/details', express.static('public'))
app.use('/reset', express.static('public'))
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.on('error', error => {
    console.error(error)
});
db.once('open', () => {
    console.log('Connected to Mongoose')
});

app.use('/admin-dashboard', adminDashboard)
app.use('/client-dashboard', clientDashboard)
app.use('/club-rush', clubRush);
app.use('/', indexRouter)
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/logout', logout);
app.use('/favorite', favorite)
app.use('/api/tokenTest', tokenTest);
app.use('/signup', signup);
app.use('/search', search);
app.use('/company', company)
app.use('/details',details);
app.use('/about', about);
app.use('/forgot', forgot);
app.use('/reset', reset);
app.use('/search', express.static('public'))
app.use('/club-rush', express.static('public'))


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
