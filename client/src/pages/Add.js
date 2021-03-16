import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';

const ADD_MOVIE = gql`
  mutation {
    addMovie(title: "a", overview: "b", poster_path: "c", popularity: 100){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

function handleChange(event) {
  setState({value: event.target.value});
}

function submitMovie(e) {
  e.preventDefault()

}

export default function Add() {
  const [addMovie, { data: movieResult }] = useMutation(ADD_MOVIE);
  const [formData, setFormData] = useState()
  return (
    <form 
      onSubmit={e => {
        e.preventDefault();
        addMovie({ variables: { type: input.value } });
        input.value = '';
      }}
    >
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label className="form-label">Overview</label>
        <input type="text" className="form-control" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label className="form-label">Poster Path</label>
        <input type="text" className="form-control" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label className="form-label">Popularity</label>
        <input type="text" className="form-control" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label className="form-label">Tags</label>
        <input type="text" className="form-control" aria-describedby="emailHelp" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}
