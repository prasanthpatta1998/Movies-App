import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const movieApiPopularStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    popularMovies: [],
    popularMovieStatus: movieApiPopularStatus.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({popularMovieStatus: movieApiPopularStatus.inProgress})
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
      this.setState({
        popularMovies: newList,
        popularMovieStatus: movieApiPopularStatus.success,
      })
    } else {
      this.setState({popularMovieStatus: movieApiPopularStatus.failure})
    }
  }

  renderPopularLoader = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        className="popular-loader"
      />
    </div>
  )

  renderPopularSuccess = () => {
    const {popularMovies} = this.state

    return (
      <>
        <ul className="popular-ul-item">
          {popularMovies.map(eachMovie => {
            const {id, backdropPath, title} = eachMovie
            return (
              <Link to={`/movies/${id}`}>
                <li className="popular-movie-image" key={id}>
                  <img
                    src={backdropPath}
                    alt={title}
                    className="popular-image"
                  />
                </li>
              </Link>
            )
          })}
        </ul>
        <div className="contact-icons-container">
          <FaGoogle className="popular-google-icon popular-google" />
          <FaTwitter className="popular-google-icon popular-twitter" />
          <FaInstagram className="popular-google-icon popular-instagram" />
          <FaYoutube className="popular-google-icon popular-facebook" />
        </div>
        <p className="popular-contact-heading">Contact</p>
      </>
    )
  }

  onRefreshPopularPage = () => {
    this.getPopularMovies()
  }

  renderPopularFailure = () => (
    <div className="popular-loader-container">
      <img
        src="https://res.cloudinary.com/duezhxznc/image/upload/v1677152293/Background-Complete_ojhbus.png"
        alt="failure"
        className="popular-failure-view"
      />
      <p className="popular-failure-view-name">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="popular-failure-button"
        onClick={this.onRefreshPopularPage}
      >
        Try Again
      </button>
    </div>
  )

  getPopularMovieList = () => {
    const {popularMovieStatus} = this.state

    switch (popularMovieStatus) {
      case movieApiPopularStatus.inProgress:
        return this.renderPopularLoader()
      case movieApiPopularStatus.success:
        return this.renderPopularSuccess()
      case movieApiPopularStatus.failure:
        return this.renderPopularFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-container">
        <Header boolValue="false" />
        {this.getPopularMovieList()}
      </div>
    )
  }
}

export default Popular
