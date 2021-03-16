import React from 'react'
import { useQuery, gql } from '@apollo/client';

const GET_MOVIES = gql`
  query getMovies {
    getMovies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export default function Movies() {
  const { loading, error, data } = useQuery(GET_MOVIES);
  if (loading) {
    return <h1>loading...</h1>
  }
  if (error) {
    return <h1>Error...</h1>
  }
  return (
    <div>
      <h1>Movies</h1>
      {
        JSON.stringify(data)
      }
    </div>
  )
}
