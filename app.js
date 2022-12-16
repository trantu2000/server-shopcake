const express = require('express')
const app = express();

var cookieParser = require('cookie-parser')
var cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const errorMiddleware = require('./middlewares/errors')

app.use(cookieParser())
app.use(cors())
app.use(express.json({limit:"300mb"}));
app.use(bodyParser.urlencoded({ extended: true ,limit:"300mb"}));
app.use(bodyParser.json());




//import all routes
const products = require('./routes/products')
const auth = require('./routes/users')
const payment = require('./routes/payment');
const order = require('./routes/order');



app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', payment)
app.use('/api/v1', order)


// Phần mềm trung gian để xử lý lỗi
app.use(errorMiddleware);

module.exports = app