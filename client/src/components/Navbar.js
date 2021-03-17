import React from 'react'
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar navbar-light" style={{backgroundColor: '#e3f2fd'}}>
      <div className="navbar-brand">Movies & TvSeries</div>
      <NavLink to="/" className="nav-link">Favorites <span className="sr-only">(current)</span></NavLink>
      <NavLink to="/movies" className="nav-link">Movies</NavLink>
      <NavLink to="/tvSeries" className="nav-link">TvSeries</NavLink>
      <NavLink to="/addForm" className="nav-link">Add New Data</NavLink>
    </nav>
  )
}
