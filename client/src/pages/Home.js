import React from 'react'
import { useQuery, gql } from '@apollo/client';
import TableBody from "../components/TableBody";

const GET_ALL = gql`
  query getAll {
    getMovies{
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
    getTvSeries{
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
  const { loading, error, data: allData } = useQuery(GET_ALL); //hanya ketika mounted atau dirender
  const tempAllData = [...allData.getMovies, ...allData.getTvSeries]
  if (loading) {
    return <h1>loading...</h1>
  }
  if (error) {
    return <h1>Error...</h1>
  }
  return (
    <div>
      <h1>All Data</h1>
      {
        // JSON.stringify(allData.getMovies),
        // JSON.stringify(allData.getTvSeries)
        // JSON.stringify(tempAllData)
      }
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">No. </th>
            <th scope="col">Title</th>
            <th scope="col">Overview</th>
            <th scope="col">Popularity</th>
            <th scope="col">Tags</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            tempAllData.map((data, idx) => <TableBody category="all" key={data._id} data={data} idx={idx}/>)
          }
        </tbody>
      </table>
    </div>
  )
}
