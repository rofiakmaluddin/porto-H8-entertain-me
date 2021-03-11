const { getDatabase } = require('../config/mongodb')

class Movie {
  static find() {
    return getDatabase().collection('movies').find().toArray()
  }
  static create(movie) {
    return getDatabase().collection('movies').insertOne(movie)
  }
  static update(movie) {
    return getDatabase().collection('movies').updateOne(movie)
  }
  static destroy(id) {
    return getDatabase().collection('movies').deleteOne( { "_id" : id } )
  }
}

module.exports = Movie