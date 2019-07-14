const MongoClient = require('mongodb').MongoClient
const Mongoose = require('mongoose')

const mongoUser = 'LiverpoolAccess'
const mongoDbName = 'liverpool-online-store'
const mongoPass = 'TCPMd8t3hjEkej6w'

const mongoConnStr = `mongodb+srv://${mongoUser}:${mongoPass}@gettingstarted-yxwqd.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`

const client = new MongoClient(mongoConnStr, {
  useNewUrlParser: true
})

let db

const createConnection = async () => {
  await client.connect()
  db = client.db('liverpool-online-store')
}

module.exports.performQuery = async (
  productImage,
  productName,
  productPrice,
  res
) => {
  if (!client.isConnected()) {
    // Cold start or connection timed out. Create new connection.
    try {
      await createConnection()
    } catch (e) {
      res.json({
        error: e.message
      })
      return
    }
  }
  try {
    const articles = db.collection('articles')

    const newProduct = {
      productImage: productImage,
      productName: productName,
      productPrice: productPrice
    }

    return {
      insertedProduct: newProduct,
      mongoResult: await articles.insertOne(newProduct)
    }
  } catch (e) {
    res.send({
      error: e.message
    })
    return
  }
}

module.exports.getCollections = async res => {
  if (!client.isConnected()) {
    try {
      await createConnection()
    } catch (e) {
      res.json({
        error: e.message
      })
      return
    }
  }
  try {
    const collection = db.collection('articles')
    collection.find({}).toArray(function(err, result) {
      try {
        res.send(JSON.stringify(result))
        return
      } catch (e) {
        res.send({
          error: e.message
        })
        return
      }
    })
  } catch (e) {
    res.send({
      error: e.message
    })
    return
  }
}

module.exports.updateDocument = async (data, res) => {
  if (!client.isConnected()) {
    try {
      await createConnection()
    } catch (e) {
      res.json({
        error: e.message
      })
      return
    }
  }

  try {
    const { productId } = data
    let objForUpdate = {}
    if (data.productImage) {
      objForUpdate.productImage = data.productImage
    }
    if (data.productName) {
      objForUpdate.productName = data.productName
    }
    if (data.productPrice) {
      objForUpdate.productPrice = data.productPrice
    }

    objForUpdate = { $set: objForUpdate }

    const myQueryId = { _id: new Mongoose.mongo.ObjectId(productId) }
    try {
      db.collection('articles').updateOne(myQueryId, objForUpdate, function(
        err,
        res
      ) {
        if (err) throw err
      })
    } catch (e) {
      res.send({
        error: e.message
      })
      return
    }
  } catch (e) {
    res.send({
      error: e.message
    })
    return
  }
}

module.exports.deleteDocument = async (data, res) => {
  if (!client.isConnected()) {
    try {
      await createConnection()
    } catch (e) {
      res.json({
        error: e.message
      })
      return
    }
  }
  try {
    const { productId } = data
    const myQueryId = { _id: new Mongoose.mongo.ObjectId(productId) }
    try {
      db.collection('articles').remove(myQueryId, function(err, res) {
        if (err) throw err
      })
    } catch (e) {
      res.send({
        error: e.message
      })
      return
    }
  } catch (e) {
    res.send({
      error: e.message
    })
    return
  }
}
