import React, { useState } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { gql, useMutation, useQuery } from '@apollo/client';

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

const UPDATE_MOVIE = gql`
  mutation updateMovie($input: MovieUpdate){
    updateMovie(updatedMovie: $input){
      message
    }
  }
`

const UPDATE_TVSERIES = gql`
  mutation updateTvSeries($input: TvSeriesUpdate){
    updateTvSeries(updatedTvSeries: $input){
      message
    }
  }
`

export default function Update() {
  const { id } = useParams()
  const history = useHistory()
  const GET_MOVIE = gql`
    query movie {
      getMovieById(id: "${id}") {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  `
  const GET_TVSERIES = gql`
    query tvSeriesById {
      getTvSeriesById(id: "${id}") {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  `
  const { loading: loadingMovie, error: errMovie, data: movieData } = useQuery(GET_MOVIE); //hanya ketika mounted atau dirender
  const { loading: loadingTv, error: errTv, data: tvSeriesData } = useQuery(GET_TVSERIES); //hanya ketika mounted atau dirender
  const [updateMovie, { data: movieResult }] = useMutation(UPDATE_MOVIE);
  const [updateTvSeries, { data: tvSeriesResult }] = useMutation(UPDATE_TVSERIES);
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [posterPath, setPosterPath] = useState('')
  const [popularity, setPopularity] = useState(0)
  const [tags, setTags] = useState([])
  // const [countTags, setCountTags] = useState(0)

  let formDataContainer

  if (movieData?.getMovieById) {
    console.log('form data movie');
    const { title, overview, poster_path: posterPath, popularity, tags } = movieData?.getMovieById
    formDataContainer = { title, overview, poster_path: posterPath, popularity, tags }
  } else if (tvSeriesData?.getTvSeriesById) {
    console.log('form data tv');
    const { title, overview, poster_path: posterPath, popularity, tags } = tvSeriesData?.getTvSeriesById
    formDataContainer = { title, overview, poster_path: posterPath, popularity, tags }
  }

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

  function submitMovie(e) {
    e.preventDefault()
    // console.log({ title, overview, poster_path: posterPath, popularity, tags });
    if (movieData.getMovieById) {
      console.log('yg di update movie <<<');
      updateMovie({ variables: { input: { id, title, overview, poster_path: posterPath, popularity, tags } }, refetchQueries: [{ query: GET_MOVIES }] });
      history.push('/movies')
    } else if (tvSeriesData.getTvSeriesById) {
      console.log('yg di update tvSeries <<<');
      updateTvSeries({ variables: { input: { id, title, overview, poster_path: posterPath, popularity, tags } }, refetchQueries: [{ query: GET_TV }] });
      history.push('/tvSeries')
    }
    // addMovie({ variables: { input: { title, overview, poster_path: posterPath, popularity, tags } }, refetchQueries: [{ query: GET_MOVIES }] }); // CONTOH REFETCHQUERIES
  }

  if (loadingMovie || loadingTv) {
    return <h1>loading...</h1>
  }
  if (errMovie || errTv) {
    return <h1>Error...</h1>
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <h3>Update Form</h3>
      <form 
        onSubmit={submitMovie}
      >
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input placeholder={formDataContainer.title} onChange={ handleChangeTitle } type="text" className="form-control" required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label className="form-label">Overview</label>
          <input placeholder={formDataContainer.overview} onChange={ handleChangeOverview } type="text" className="form-control" required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label className="form-label">Poster Path</label>
          <input placeholder={formDataContainer.poster_path} onChange={ handleChangePosterPath } type="text" className="form-control" required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label className="form-label">Popularity</label>
          <input placeholder={formDataContainer.popularity} onChange={ handleChangePopularity } type="number" className="form-control" required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input placeholder={formDataContainer.tags} onChange={ handleChangeTags } type="text" className="form-control" required aria-describedby="emailHelp" />
        </div>
        <button type="submit" className="btn btn-primary">Update Data</button>
      </form>
    </div>
  )
}
