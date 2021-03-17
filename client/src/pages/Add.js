import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';

const ADD_MOVIE = gql`
  mutation addMovie($input: MovieInput){
    addMovie(movie: $input){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const ADD_TVSERIES = gql`
  mutation addTvSeries($input: TvSeriesInput){
    addTvSeries(tvSeries: $input){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export default function Add() {
  const [addMovie, { data: movieResult }] = useMutation(ADD_MOVIE);
  const [addTvSeries, { data: tvSeriesResult }] = useMutation(ADD_TVSERIES);
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [posterPath, setPosterPath] = useState('')
  const [popularity, setPopularity] = useState(0)
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState('')
  // const [countTags, setCountTags] = useState(0)

  function handleChangeTitle(event) {
    setTitle(event.target.value);
  }
  function handleChangeOverview(event) {
    setOverview(event.target.value);
  }
  function handleChangePosterPath(event) {
    setPosterPath(event.target.value);
  }
  function handleChangePopularity(event) {
    setPopularity(+event.target.value);
  }
  function handleChangeTags(event) {
    const temp = []
    temp.push(event.target.value)
    setTags(temp);
  }
  function handleChangeCategory(event) {
    setCategory(event.target.value);
  }

  function submitMovie(e) {
    e.preventDefault()
    // console.log({ title, overview, poster_path: posterPath, popularity, tags });
    if (category === 'movie') {
      console.log('yg di add movie <<<');
      addMovie({ variables: { input: { title, overview, poster_path: posterPath, popularity, tags } } });
    } else {
      console.log('yg di add tvSeries <<<');
      addTvSeries({ variables: { input: { title, overview, poster_path: posterPath, popularity, tags } } });
    }

    // addMovie({ variables: { input: { title, overview, poster_path: posterPath, popularity, tags } }, refetchQueries: [{ query: GET_MOVIES }] }); // CONTOH REFETCHQUERIES
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h3>Add Form</h3>
      <form 
        onSubmit={submitMovie}
      >
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input onChange={ handleChangeTitle } type="text" className="form-control" required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label className="form-label">Overview</label>
          <input onChange={ handleChangeOverview } type="text" className="form-control" required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label className="form-label">Poster Path</label>
          <input onChange={ handleChangePosterPath } type="text" className="form-control" required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label className="form-label">Popularity</label>
          <input onChange={ handleChangePopularity } type="number" className="form-control" required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input onChange={ handleChangeTags } type="text" className="form-control" required aria-describedby="emailHelp" />
        </div>
        <select onChange={ handleChangeCategory } className="form-select" required aria-label="Default select example">
          <option selected disabled hidden>--- Select Category ---</option>
          <option value="movie">Movie</option>
          <option value="tvSeries">TvSeries</option>
        </select> <br /> <br />
        <button type="submit" className="btn btn-primary">Add Data</button>
      </form>
    </div>
  )
}
