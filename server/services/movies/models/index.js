const { getDatabase } = require('../config/mongodb')
const { ObjectID } = require('mongodb')

class Movie {
  static find() {
    return getDatabase().collection('movies').find().toArray()
  }
  static findOne(id) {
    return getDatabase().collection('movies').findOne({ _id: ObjectID(id) })
  }
  static create(movie) {
    return getDatabase().collection('movies').insertOne(movie)
  }
  static update(id, movie) {
    return getDatabase().collection('movies').updateOne({ _id: ObjectID(id) }, { $set: movie })
  }
  static destroy(id) {
    return getDatabase().collection('movies').deleteOne({ _id: ObjectID(id) })
  }
}

module.exports = Movie