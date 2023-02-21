import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class SearchMovieRouter extends Component {
  state = {
    searchInput: '',
    searchResults: [],
  }

  showSearchResults = async () => {
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      const newList = data.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({searchResults: newList})
    }
  }

  onSearchMovies = inputValue => {
    if (inputValue === '') {
      this.setState({searchInput: inputValue, searchResults: []})
    } else {
      this.setState({searchInput: inputValue}, this.showSearchResults)
    }
  }

  render() {
    const {searchResults} = this.state
    return (
      <div className="search-background-container">
        <Header boolValue="true" onSearchMovies={this.onSearchMovies} />
        <ul className="popular-ul-item">
          {searchResults.map(eachMovie => {
            const {id, backdropPath, title} = eachMovie
            return (
              <li className="popular-movie-image" key={id}>
                <img src={backdropPath} alt={title} className="popular-image" />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default SearchMovieRouter
