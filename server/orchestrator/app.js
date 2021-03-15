const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }
  type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }
  type DeleteStatus {
    deletedCount: Int
  }
  type Query {
    message: String
    getMovies: [Movie]
    getMovieById(id: ID!): Movie
    getTvSeries: [TvSeries]
    getTvSeriesById(id: ID!): TvSeries
  }
  type Mutation {
    addMovie(title: String, overview: String, poster_path: String, popularity: Int, tags: [String]): Movie
    updateMovie(id: ID!, title: String, overview: String, poster_path: String, popularity: Int, tags: [String]): Movie
    deleteMovie(id: ID!): DeleteStatus
    addTvSeries(title: String, overview: String, poster_path: String, popularity: Int, tags: [String]): TvSeries
    updateTvSeries(id: ID!, title: String, overview: String, poster_path: String, popularity: Int, tags: [String]): TvSeries
    deleteTvSeries(id: ID!): DeleteStatus
  }
`

const resolvers = {
  Query: {
    message() {
      return 'Hello test'
    },
    async getMovies() {
      try {
        const moviesData = await redis.get('movies:data')
        if (moviesData) {
          console.log('dari cache');
          return JSON.parse(moviesData)
        } else {
          axios.get('http://localhost:4001')
            .then(({ data }) => {
              redis.set("movies:data", JSON.stringify(data))
              console.log('ini baru');
              return data
            })
            .catch(err => {
              console.log(err)
            })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getMovieById(parent, args, context, info) {
      try {
        await redis.del('movies:data')
        const { id } = args
        console.log('ini id nya >>>', id);
        axios.get(`http://localhost:4001/${id}`)
          .then(({ data }) => {
            console.log('data movie by id >>>', data);
            return data
          })
          .catch(err => {
            // console.log(err)
          })
      } catch (error) {
        // console.log(error)
      }
    },
    async getTvSeries() {
      try {
        const tvSeriesData = await redis.get('tvSeries:data')
        if (tvSeriesData) {
          console.log('dari cache');
          return JSON.parse(tvSeriesData)
        } else {
          axios.get('http://localhost:4002')
            .then(({ data }) => {
              redis.set("tvSeries:data", JSON.stringify(data))
              console.log('ini baru');
              return data
            })
            .catch(err => {
              console.log(err)
            })
        }
      } catch (error) {
        console.log (error)
      }
    },
    async getTvSeriesById(parent, args, context, info) {
      try {
        await redis.del('tvSeries:data')
        const { id } = args
        axios.get(`http://localhost:4002/${id}`)
          .then(({ data }) => {
            return data
          })
          .catch(err => {
            console.log(err)
          })
      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation: {
    async addMovie(parent, args, context, info){
      try {
        await redis.del('movies:data')
        const { title, overview, post_path, popularity, tags } = args
        axios({
          method: 'POST',
          url: 'http://localhost:4001',
          data: { title, overview, post_path, popularity, tags }
        }).then(({ data }) => {
          return data
        })
      } catch (error) {
        console.log(error)
      }
    },
    async updateMovie(parent, args, context, info){
      try {
        await redis.del('movies:data')
        const { id } = args
        const { title, overview, post_path, popularity, tags } = args
        axios({
          method: 'PUT',
          url: `http://localhost:4001/${id}`,
          data: { title, overview, post_path, popularity, tags }
        }).then(({ data }) => {
          return data
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteMovie(parent, args, context, info){
      try {
        await redis.del('movies:data')
        const { id } = args
        axios.delete(`http://localhost:4001/${id}`)
          .then(({ data }) => {
            return data
          })
          .catch(err => {
            console.log(err)
          })
      } catch (error) {
        console.log(error)
      }
    },
    async addTvSeries(parent, args, context, info) {
      try {
        await redis.del('tvSeries:data')
        const { title, overview, post_path, popularity, tags } = args
        axios({
          method: 'POST',
          url: 'http://localhost:4002',
          data: { title, overview, post_path, popularity, tags }
        }).then(({ data }) => {
          return data
        })
      } catch (error) {
        console.log(error)
      }
    },
    async updateTvSeries(parent, args, context, info){
      try {
        await redis.del('tvSeries:data')
        const { id } = args
        const { title, overview, post_path, popularity, tags } = args
        axios({
          method: 'PUT',
          url: `http://localhost:4002/${id}`,
          data: { title, overview, post_path, popularity, tags }
        }).then(({ data }) => {
          return data
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteTvSeries(parent, args, context, info){
      try {
        await redis.del('tvSeries:data')
        const { id } = args
        axios.delete(`http://localhost:4002/${id}`)
          .then(({ data }) => {
            return data
          })
          .catch(err => {
            console.log(err)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log('apollo is running on url ', url))