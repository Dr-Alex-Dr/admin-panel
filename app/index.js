const path = require('path')

const express = require('express');
const { engine } = require('express-handlebars');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
	host: 'localhost',
	port: 3306,
	user: 'session_test',
	password: 'root',
	database: 'root'
};

const sessionStore = new MySQLStore(options);

const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());


require('./authentication').init(app)

app.use(session({
  sessionStore,
  secret: 'session_cookie_secret',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.engine('.hbs', engine({
  defaultLayout: 'layout',
  extname: '.hbs',
  layoutsDir: path.join(__dirname),
  partialsDir: path.join(__dirname)
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname))

require('./user').init(app)
require('./note').init(app)

module.exports = app
