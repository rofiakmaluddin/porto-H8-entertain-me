const { ApolloServer, gql, ApolloError } = require("apollo-server");
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
    message: String
  }
  type UpdateStatus {
    message: String
  }
  type Query {
    message: String
    getMovies: [Movie]
    getMovieById(id: ID!): Movie
    getTvSeries: [TvSeries]
    getTvSeriesById(id: ID!): TvSeries
  }
  input MovieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Int!
    tags: [String]
  }
  input MovieUpdate {
    id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Int!
    tags: [String]
  }
  input TvSeriesInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Int!
    tags: [String]
  }
  input TvSeriesUpdate {
    id: ID!
    title: String!
    overview: String!
    poster_path: String!
    popularity: Int!
    tags: [String]
  }
  type Mutation {
    addMovie(movie: MovieInput): Movie
    updateMovie(updatedMovie: MovieUpdate): UpdateStatus
    deleteMovie(id: ID!): DeleteStatus
    addTvSeries(tvSeries: TvSeriesInput): TvSeries
    updateTvSeries(updatedTvSeries: TvSeriesUpdate): UpdateStatus
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
          return axios.get('http://localhost:4001')
            .then(({ data }) => {
              redis.set("movies:data", JSON.stringify(data))
              console.log('ini baru');
              return data
            })
            .catch(err => {
              console.log(err)
              return new ApolloError(err)
            })
        }
      } catch (error) {
        console.log(error)
        return new ApolloError(error)
      }
    },
    async getMovieById(parent, args, context, info) {
      try {
        const { id } = args
        return axios.get(`http://localhost:4001/${id}`)
          .then(({ data }) => {
            return data
          })
          .catch(err => {
            return new ApolloError(err)
          })
      } catch (error) {
        return new ApolloError(error)
      }
    },
    async getTvSeries() {
      try {
        const tvSeriesData = await redis.get('tvSeries:data')
        if (tvSeriesData) {
          console.log('dari cache');
          return JSON.parse(tvSeriesData)
        } else {
          return axios.get('http://localhost:4002')
            .then(({ data }) => {
              redis.set("tvSeries:data", JSON.stringify(data))
              console.log('ini baru');
              return data
            })
            .catch(err => {
              console.log(err)
              return new ApolloError(err)
            })
        }
      } catch (error) {
        console.log (error)
        return new ApolloError(error)
      }
    },
    async getTvSeriesById(parent, args, context, info) {
      try {
        const { id } = args
        return axios.get(`http://localhost:4002/${id}`)
          .then(({ data }) => {
            return data
          })
          .catch(err => {
            console.log(err)
            return new ApolloError(err)
          })
      } catch (error) {
        console.log(error)
        return new ApolloError(error)
      }
    }
  },
  Mutation: {
    async addMovie(parent, args, context, info){
      try {
        console.log(args, '<<< ini args');
        const { title, overview, poster_path, popularity, tags } = args.movie
        return axios({
          method: 'POST',
          url: 'http://localhost:4001',
          data: { title, overview, poster_path, popularity, tags }
        }).then(({ data }) => {
          redis.del('movies:data')
          return data.ops[0]
        }).catch(err => {
          return new ApolloError(err)
        })
      } catch (error) {
        console.log(error)
        return new ApolloError(error)
      }
    },
    async updateMovie(parent, args, context, info){
      try {
        const { id, title, overview, poster_path, popularity, tags } = args.updatedMovie
        return axios({
          method: 'PUT',
          url: `http://localhost:4001/${id}`,
          data: { title, overview, poster_path, popularity, tags }
        }).then(({ data }) => {
          const message = 'Movie has been updated'
          redis.del('movies:data')
          return {message}
        }).catch(err => {
          return new ApolloError(err)
        })
      } catch (error) {
        console.log(error)
        return new ApolloError(error)
      }
    },
    async deleteMovie(parent, args, context, info){
      try {
        const { id } = args
        return axios.delete(`http://localhost:4001/${id}`)
        .then(({ data }) => {
          const message = 'Movie has been deleted'
          redis.del('movies:data')
          return {message}
        })
          .catch(err => {
            console.log(err)
            return new ApolloError(err)
          })
      } catch (error) {
        console.log(error)
        return new ApolloError(error)
      }
    },
    async addTvSeries(parent, args, context, info) {
      try {
        const { title, overview, poster_path, popularity, tags } = args.tvSeries
        return axios({
          method: 'POST',
          url: 'http://localhost:4002',
          data: { title, overview, poster_path, popularity, tags }
        }).then(({ data }) => {
          redis.del('tvSeries:data')
          return data.ops[0]
        }).catch(err => {
          return new ApolloError(err)
        })
      } catch (error) {
        console.log(error)
        return new ApolloError(error)
      }
    },
    async updateTvSeries(parent, args, context, info){
      try {
        const { id, title, overview, poster_path, popularity, tags } = args.updatedTvSeries
        return axios({
          method: 'PUT',
          url: `http://localhost:4002/${id}`,
          data: { title, overview, poster_path, popularity, tags }
        }).then(({ data }) => {
          const message = 'TvSeries has been updated'
          redis.del('tvSeries:data')
          return {message}
        }).catch(err => {
          return new ApolloError(err)
        })
      } catch (error) {
        console.log(error)
        return new ApolloError(error)
      }
    },
    async deleteTvSeries(parent, args, context, info){
      try {
        const { id } = args
        return axios.delete(`http://localhost:4002/${id}`)
        .then(({ data }) => {
          const message = 'TvSeries has been deleted'
          redis.del('tvSeries:data')
          return {message}
        })
        .catch(err => {
          console.log(err)
          return new ApolloError(err)
        })
      } catch (error) {
        console.log(error)
        return new ApolloError(error)
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log('apollo is running on url ', url))