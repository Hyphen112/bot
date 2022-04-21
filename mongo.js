const mongo = require('mongoose');
const mongoPath = process.env.MONGOPATH

module.exports = async () => {
  await mongo.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  return mongo
}
