const { performQuery } = require('../../../inc/mongoDbManager')

module.exports.createProduct = async function(req, res, next) {
  const data = req.body
  const { productImage, productName, productPrice } = data
  await performQuery(productImage, productName, productPrice, res)
  res.json({
    statusCode: 200,
    message: 'done'
  })
}
