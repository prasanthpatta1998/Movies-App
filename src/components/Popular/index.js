import {Component} from 'react'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Popular extends Component {
  state = {
    popularMovies: [],
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const newList = data.results.map(eachMovie => ({
        id: eachMovie.id,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({popularMovies: newList})
    }
  }

  render() {
    const {popularMovies} = this.state

    return (
      <div className="popular-container">
        <Header boolValue="false" />
        <ul className="popular-ul-item">
          {popularMovies.map(eachMovie => {
            const {id, backdropPath, title} = eachMovie
            return (
              <li className="popular-movie-image" key={id}>
                <img src={backdropPath} alt={title} className="popular-image" />
              </li>
            )
          })}
        </ul>
        <div className="contact-icons-container">
          <FaGoogle className="google-icon" />
          <FaTwitter className="google-icon" />
          <FaInstagram className="google-icon" />
          <FaYoutube className="google-icon" />
        </div>
        <p className="contact-heading">Contact</p>
      </div>
    )
  }
}

export default Popular
