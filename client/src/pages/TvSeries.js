import React from 'react'
import { useQuery, gql } from '@apollo/client';
import TableBody from '../components/TableBody';

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
      {/* {
        JSON.stringify(data.getTvSeries)
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
            data.getTvSeries.map((tvSeries, idx) => <TableBody category="tv" key={tvSeries._id} data={tvSeries} idx={idx}/>)
          }
        </tbody>
      </table>
    </div>
  )
}
