require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.once('open', () => console.log('Connected to Database'))

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }))
app.use(cors());


const shoesRouter = require('./routes/product')
app.use('/products', shoesRouter)

app.listen(process.env.PORT, () => console.log('Server Started'))