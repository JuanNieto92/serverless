const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const meals = require('./routes/meals')
const orders = require('./routes/orders')

const app = express()
app.use(bodyParser.json())
app.use(cors())


const url ="mongodb+srv://almuerzimaster:almuerzi22@cluster0.4xben.mongodb.net/almuerzi-db?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
//mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})

app.use('/api/meals',meals)
app.use('/api/orders',orders)

module.exports = app

