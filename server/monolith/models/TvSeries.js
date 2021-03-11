const { getDatabase } = require('../config/mongodb')

class TvSeries {
  static find(){
    return getDatabase().collection('tvSeries').toArray()
  }
}

module.exports = TvSeries