const { getCollections } = require('../../../inc/mongoDbManager')

module.exports.getProducts = async function(req, res, next) {
  await getCollections(res)
}
