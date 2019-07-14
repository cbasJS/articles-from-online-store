const { updateDocument } = require('../../../inc/mongoDbManager')

module.exports.updateProduct = async (req, res, next) => {
  const data = req.body
  const { productId } = data
  if (!productId) {
    res.status(400).json({ error: `'productId' is ${typeof data.producId}` })
    return
  }

  await updateDocument(data, res)
  res.json({
    statusCode: 200,
    message: 'done'
  })
}
