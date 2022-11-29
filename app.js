const express = require('express')
const app = express();


var cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')

if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: '../server/config/config.env' })

const errorMiddleware = require('./middlewares/errors')

app.use(cors())
app.use(express.json({limit:"300mb"}));
app.use(bodyParser.urlencoded({ extended: true ,limit:"300mb"}));
app.use(bodyParser.json());
app.use(cookieParser())

//import all routes
const products = require('./routes/products')
const auth = require('./routes/users')
const payment = require('./routes/payment');
const order = require('./routes/order');



app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', payment)
app.use('/api/v1', order)


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '/frontend')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '/frontend/public/index.html'))
//     })
// }


// Phần mềm trung gian để xử lý lỗi
app.use(errorMiddleware);

module.exports = app