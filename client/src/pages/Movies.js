import React from 'react'
import { useQuery, gql } from '@apollo/client';
import TableBody from "../components/TableBody";

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
  const { loading, error, data: movies } = useQuery(GET_MOVIES); //hanya ketika mounted atau dirender
  if (loading) {
    return <h1>loading...</h1>
  }
  if (error) {
    return <h1>Error...</h1>
  }
  return (
    <div>
      <h1>Movies</h1>
      {/* {
        JSON.stringify(movies.getMovies)
      } */}
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">No. </th>
            <th scope="col">Title</th>
            <th scope="col">Overview</th>
            <th scope="col">Poster Path</th>
            <th scope="col">Popularity</th>
            <th scope="col">Tags</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            movies.getMovies.map((movie, idx) => <TableBody category="movie" key={movie._id} data={movie} idx={idx}/>)
          }
        </tbody>
      </table>
    </div>
  )
}
