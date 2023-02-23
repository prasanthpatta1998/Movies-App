import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import './index.css'

const movieApiOriginalStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

class OriginalMovies extends Component {
  state = {
    originalList: [],
    movieOriginalStatus: movieApiOriginalStatus.initial,
  }

  componentDidMount() {
    this.getOriginalMovies()
  }

  getOriginalMovies = async () => {
    this.setState({movieOriginalStatus: movieApiOriginalStatus.inProgress})
    const url = 'https://apis.ccbp.in/movies-app/originals'
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
        originalList: newList,
        movieOriginalStatus: movieApiOriginalStatus.success,
      })
    } else {
      this.setState({movieOriginalStatus: movieApiOriginalStatus.failure})
    }
  }

  renderSlider = () => {
    const {originalList} = this.state
    return (
      <Slider {...settings}>
        {originalList.map(eachLogo => {
          const {id, backdropPath, title} = eachLogo
          return (
            <Link to={`/movies/${id}`}>
              <div className="original-slick-item" key={id}>
                <img
                  className="original-logo-image"
                  src={backdropPath}
                  alt={title}
                />
              </div>
            </Link>
          )
        })}
      </Slider>
    )
  }

  renderOriginalLoader = () => (
    <div className="Original-loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#D81F26"
        height={50}
        width={50}
        className="Original-loader"
      />
    </div>
  )

  renderOriginalSuccess = () => (
    <div className="original-slider">
      <h1 className="original-now-heading">Originals</h1>
      <div className="slick-container">{this.renderSlider()}</div>
    </div>
  )

  renderOriginal = () => {
    const {movieOriginalStatus} = this.state

    switch (movieOriginalStatus) {
      case movieApiOriginalStatus.inProgress:
        return this.renderOriginalLoader()
      case movieApiOriginalStatus.success:
        return this.renderOriginalSuccess()
      case movieApiOriginalStatus.failure:
        return this.renderOriginalFailure()
      default:
        return null
    }
  }

  render() {
    return this.renderOriginal()
  }
}

export default OriginalMovies
