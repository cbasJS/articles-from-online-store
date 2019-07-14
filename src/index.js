/**
 * index.js
 */
const express = require('express')
const bodyParser = require('body-parser')
const serverless = require('serverless-http')
const { createProduct } = require('./handlers/api/services/createProduct')
const { getProducts } = require('./handlers/api/services/getProducts')
const { updateProduct } = require('./handlers/api/services/updateProduct')
const { deleteProduct } = require('./handlers/api/services/deleteProduct')

const app = express()
app.use(bodyParser.json({ strict: false }))

app.post('/createProduct', createProduct)

app.get('/getProducts', getProducts)

app.post('/updateProduct', updateProduct)

app.post('/deleteProduct', deleteProduct)

module.exports.app = app
module.exports.handler = serverless(app)
