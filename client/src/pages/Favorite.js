import React from 'react'
import { useReactiveVar } from "@apollo/client";
import { favoritesVar } from '../config/vars'
import TableBody from "../components/TableBody";

export default function Home() {
  const favorites = useReactiveVar(favoritesVar)

  if (!favorites.length) {
    return <h1>No Movie or TV Series in Favorites</h1>
  }

  return (
    <div>
      <h1>Favorites</h1>
      {/* {
        JSON.stringify(favorites)
      } */}
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
            favorites.map((fav, idx) => <TableBody category="favorite" key={fav._id} data={fav} idx={idx}/>)
          }
        </tbody>
      </table>
    </div>
  )
}
