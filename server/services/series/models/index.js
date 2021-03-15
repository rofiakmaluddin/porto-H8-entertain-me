const { getDatabase } = require('../config/mongodb')
const { ObjectID } = require('mongodb')

class TvSeries {
  static find(){
    return getDatabase().collection('tvSeries').find().toArray()
  }
  static findOne(id) {
    return getDatabase().collection('tvSeries').findOne({ _id: ObjectID(id) })
  }
  static create(movie) {
    return getDatabase().collection('tvSeries').insertOne(movie)
  }
  static update(id, movie) {
    return getDatabase().collection('tvSeries').updateOne({ _id: ObjectID(id) }, { $set: movie })
  }
  static destroy(id) {
    return getDatabase().collection('tvSeries').deleteOne({ _id: ObjectID(id) })
  }
}

module.exports = TvSeries