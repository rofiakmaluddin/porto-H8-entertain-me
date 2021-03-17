import './App.css';
import { Switch, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvSeries from "./pages/TvSeries";
import Add from "./pages/Add";
import Update from "./pages/Update";

function App() {
  return (
    <>
      <Switch>
        <Route path="/updateForm/:id">
          <Navbar />
          <Update />
        </Route>
        <Route path="/addForm">
          <Navbar />
          <Add />
        </Route>
        <Route path="/tvSeries">
          <Navbar />
          <TvSeries />
        </Route>
        <Route path="/movies">
          <Navbar />
          <Movies />
        </Route>
        <Route path="/">
          <Navbar />
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
