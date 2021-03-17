import React from 'react'
import { useHistory } from "react-router-dom";
import { gql, useMutation } from '@apollo/client';
import { favoritesVar } from '../config/vars'

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

const GET_TV = gql`
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

export default function TableBody(props) {
  const { idx, data, category } = props
  const tempId = data._id
  const history = useHistory()
  
  const DELETE_MOVIE = gql`
    mutation {
      deleteMovie(id: "${data._id}"){
        message
      }
    }
  `
  
  const DELETE_TVSERIES = gql`
    mutation {
      deleteTvSeries(id: "${data._id}"){
        message
      }
    }
  `
  const [deleteMovie, { data: movieResult }] = useMutation(DELETE_MOVIE);
  const [deleteTvSeries, { data: tvResult }] = useMutation(DELETE_TVSERIES);
  
  function clickUpdate() {
    history.push(`/updateForm/${data._id}`)
  }

  function addToFav() {
    const existingFavorites = favoritesVar()
    const newData = data
    favoritesVar([newData, ...existingFavorites])
  }

  function removeFav() {
    const existingFavorites = favoritesVar()
    const newData = existingFavorites.filter(e => e._id !== tempId)
    favoritesVar(newData)
  }

  function clickDelete() {
    if (category === 'movie') {
      deleteMovie({ refetchQueries: [{ query: GET_MOVIES }] })
    } else {
      deleteTvSeries({ refetchQueries: [{ query: GET_TV }] })
    }
  }

  if (category === 'favorite') {
    return (
      <tr>
        <th scope="row">{ idx + 1 }</th>
        <td>{ data.title }</td>
        <td>{ data.overview }</td>
        <td>{ data.popularity }</td>
        <td>{ data.tags }</td>
        <td>{ data.__typename }</td>
        <td>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={ clickUpdate } type="button" className="btn btn-secondary">Update</button>
            <button onClick={ removeFav } type="button" className="btn btn-info">Remove</button>
            <button onClick={ clickDelete } type="button" className="btn btn-light">Delete</button>
          </div>
        </td>
      </tr>
    )
  } else if (category === 'all') {
    return (
      <tr>
        <th scope="row">{ idx + 1 }</th>
        <td>{ data.title }</td>
        <td>{ data.overview }</td>
        <td>{ data.popularity }</td>
        <td>{ data.tags }</td>
        <td>{ data.__typename }</td>
        <td>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={ clickUpdate } type="button" className="btn btn-secondary">Update</button>
            <button onClick={ addToFav } type="button" className="btn btn-info">Favorite</button>
            <button onClick={ clickDelete } type="button" className="btn btn-light">Delete</button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <th scope="row">{ idx + 1 }</th>
      <td>{ data.title }</td>
      <td>{ data.overview }</td>
      <td>{ data.poster_path }</td>
      <td>{ data.popularity }</td>
      <td>{ data.tags.join(', ') }</td>
      <td>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button onClick={ clickUpdate } type="button" className="btn btn-secondary">Update</button>
          <button onClick={ addToFav } type="button" className="btn btn-info">Favorite</button>
          <button onClick={ clickDelete } type="button" className="btn btn-light">Delete</button>
        </div>
      </td>
    </tr>
  )
}
