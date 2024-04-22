const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()
const PORT = 5000
const MONGO_URI = 'mongodb://127.0.0.1:27017/duck-warehouse'
const processOrder = require('./processOrder')

app.use(cors())
app.use(express.json())

mongoose.connect(MONGO_URI)
const connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

const Duck = require('./models/duck')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Get ducks
app.get('/ducks', async (req, res) => {
    const ducks = await Duck.find({ deleted: false }).sort({ quantity: 'descending' })

    res.json(ducks)
})

// Add duck
app.post('/add', async (req, res) => {
    const { color, size, price, quantity } = req.body
    const ducks = await Duck.find({ color, size, deleted: false })

    if (ducks.length > 0) {
        const duck = ducks[0]
        duck.price = price
        duck.quantity += parseInt(quantity)

        try {
            await duck.save()
            res.json('Duck updated!')
        } catch (err) {
            res.status(400).json(`Error: ${err}`)
        }
    } else {
        const duck = new Duck({ color, size, price, quantity})

        try {
            await duck.save()
            res.json('Duck added!')
        } catch (err) {
            res.status(400).json(`Error: ${err}`)
        }
    }
})

// Delete ducks
app.post('/delete', async (req, res) => {
    const { color, size } = req.body
    const ducks = await Duck.find({ color, size, deleted: false })

    if (ducks.length > 0) {
        const duck = ducks[0]
        duck.deleted = true

        try {
            await duck.save()
            res.json('Duck deleted!')
        } catch (err) {
            res.status(400).json(`Error: ${err}`)
        }
    } else {
        res.json('Duck not found!')
    }
})

// Edit ducks
app.post('/edit', async (req, res) => {
    const { color, size, price, quantity } = req.body
    const ducks = await Duck.find({ color, size, deleted: false })

    if (ducks.length > 0) {
        const duck = ducks[0]
        duck.price = price
        duck.quantity = quantity

        try {
            await duck.save()
            res.json('Duck updated!')
        } catch (err) {
            res.status(400).json(`Error: ${err}`)
        }
    } else {
        res.json('Duck not found!')
    }
})

app.post('/order', async (req, res) => {
    const { color, size, quantity, country, shippingMode } = req.body
    const ducks = await Duck.find({ color, size, deleted: false })

    if (ducks.length > 0) {
        const duck = ducks[0]

        const result = processOrder(duck, quantity, country, shippingMode)
        res.json(result)
    } else {
        res.json('Duck not found!')
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})