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
    const movies = this.state.movies.map((movie) => {
      return <Movie title={movie.title} poster={movie.large_cover_image} key={movie.id} />
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
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    .then(movieData => movieData.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        {this.state.movies ? this._renderMoives() : 'loading...'}
      </div>
    );
  }
}

export default App;
