import React, { Component } from 'react';
import './App.css';
import Movie from './Movie.js';

class App extends Component {

  // Render: componentWillMount() -> render() - > componentDidMount()
  // Update: componentWillReceivedProps() - > shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {}

  componentDidMount() {
    this._getMovies();
  }
  
  _renderMoives = () => {
    const movies = this.state.movies.slice(0, 4).map((movie) => {
      // console.log(movie)
      return <Movie 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    })
    return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(movieData => movieData.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMoives() : 'loading'}
      </div> 
    );
  }
}

export default App;
