import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import format from 'date-fns/format'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const movieApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetailsRouter extends Component {
  state = {
    movieData: {},
    movieStatus: movieApiStatus.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({movieStatus: movieApiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
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
      const newData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: data.movie_details.similar_movies,
        spokenLanguages: data.movie_details,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      console.log(newData)
      this.setState({movieData: newData, movieStatus: movieApiStatus.success})
    } else {
      this.setState({movieStatus: movieApiStatus.failure})
    }
  }

  getSimilarMovies = () => {
    const {movieData} = this.state
    const {similarMovies} = movieData
    const similarMoviesList = similarMovies.map(eachMovie => ({
      id: eachMovie.id,
      backdropPath: eachMovie.backdrop_path,
      overview: eachMovie.overview,
      posterPath: eachMovie.poster_path,
      title: eachMovie.title,
    }))

    return (
      <ul className="similar-movies">
        {similarMoviesList.map(eachMovie => {
          const {id, backdropPath, title} = eachMovie
          return (
            <Link to={`/movies/${id}`}>
              <li className="similar-li-item" key={eachMovie.id}>
                <img
                  src={backdropPath}
                  alt={title}
                  className="similar-poste-path"
                />
              </li>
            </Link>
          )
        })}
      </ul>
    )
  }

  getRenderMovieData = () => {
    const {movieData} = this.state
    const {
      adult,
      backdropPath,
      budget,
      genres,
      overview,
      releaseDate,
      runtime,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = movieData

    const movieCertificate = adult ? 'A' : 'U/A'
    const hours = Math.floor(runtime / 60)
    const minutes = runtime - hours * 60
    const year = format(new Date(releaseDate), 'yyyy')
    const audioLanguage = {
      audios: spokenLanguages.spoken_languages,
    }
    const availableAudios = audioLanguage.audios.map(eachLanguage => ({
      id: eachLanguage.id,
      englishName: eachLanguage.english_name,
    }))

    const releasedDate = format(new Date(releaseDate), 'Mo MMMM yyyy')

    return (
      <>
        <img src={backdropPath} alt={title} className="detail-movie-image" />

        <h1 className="specific-movie-name">{title}</h1>
        <p className="runtime">{`${hours}h ${minutes}m`}</p>
        <p className="movieCertificate">{`${movieCertificate}`}</p>
        <p className="year">{`${year}`}</p>
        <p className="overview">{overview}</p>
        <button type="button" className="play-specific-movie">
          Play
        </button>
        <div className="linear-gradient"> </div>
        <div className="linear-gradient-horizontal"> </div>
        <p className="genres">Genres</p>
        <ul className="genres-list">
          {genres.map(eachGenre => (
            <li className="eachGenreName" key={eachGenre.id}>
              {eachGenre.name}
            </li>
          ))}
        </ul>
        <p className="audio-available">Audio Available</p>
        <ul className="audio-languages">
          {availableAudios.map(eachAudio => (
            <li key={eachAudio.id}>{eachAudio.englishName}</li>
          ))}
        </ul>
        <p className="rating-count">Rating Count</p>
        <p className="vote-count">{voteCount}</p>
        <p className="rating-average">Rating Average</p>
        <p className="vote-average">{voteAverage}</p>
        <p className="budget">Budget</p>
        <p className="total-budget">{budget}</p>
        <p className="release-date">Release Date</p>
        <p className="released-movie-date">{releasedDate}</p>
        <h1 className="more-like-this">More like this </h1>
        {this.getSimilarMovies()}
        <div className="contact-icons-container-movie">
          <FaGoogle className="google-icon google" />
          <FaTwitter className="google-icon twitter" />
          <FaInstagram className="google-icon instagram" />
          <FaYoutube className="google-icon facebook" />
        </div>
        <p className="contact-heading-movie">Contact Us</p>
      </>
    )
  }

  renderMovieLoader = () => (
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

  onRefreshMoviePage = () => {
    this.getMovieDetails()
  }

  renderMovieFailure = () => (
    <div className="search-loader-container">
      <img
        src="https://res.cloudinary.com/duezhxznc/image/upload/v1677152293/Background-Complete_ojhbus.png"
        alt="failure"
        className="search-failure-view"
      />
      <p className="search-failure-view-name">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="search-failure-button"
        onClick={this.onRefreshMoviePage}
      >
        Try Again
      </button>
    </div>
  )

  renderMovieSuccess = () => this.getRenderMovieData()

  renderMoviesData = () => {
    const {movieStatus} = this.state
    switch (movieStatus) {
      case movieApiStatus.inProgress:
        return this.renderMovieLoader()
      case movieApiStatus.success:
        return this.renderMovieSuccess()
      case movieApiStatus.failure:
        return this.renderMovieFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-detail-container">
        <Header boolValue="false" />
        {this.renderMoviesData()}
      </div>
    )
  }
}

export default MovieDetailsRouter
