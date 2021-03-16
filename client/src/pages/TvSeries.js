import React from 'react'
import { useQuery, gql } from '@apollo/client';

const GET_TVSERIES = gql`
  query getTvSeries {
    getTvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export default function TvSeries() {
  const { loading, error, data } = useQuery(GET_TVSERIES);
  if (loading) {
    return <h1>loading...</h1>
  }
  if (error) {
    return <h1>Error...</h1>
  }
  return (
    <div>
      <h1>TvSeries</h1>
      {
        JSON.stringify(data)
      }
    </div>
  )
}
