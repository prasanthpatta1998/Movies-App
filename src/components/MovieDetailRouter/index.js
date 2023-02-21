import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class MovieDetailsRouter extends Component {
  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
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
    console.log(data)
  }

  render() {
    return (
      <div className="movie-detail-container">
        <Header boolValue="false" />
      </div>
    )
  }
}

export default MovieDetailsRouter
