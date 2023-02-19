import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'
import TrendingMovies from '../TrendingMovies'
import OriginalMovies from '../OriginalMovies'
import './index.css'

const Home = () => (
  <div className="home-container">
    <div className="home-background-container">
      <Header />
      <h1 className="home-heading">Super Man</h1>
      <p className="home-description">
        Superman is a fictional superhero who first appeared in American comic
        books published by DC Comics.
      </p>
      <button type="button" className="home-button">
        Play
      </button>
      <TrendingMovies />
      <OriginalMovies />

      <div className="contact-icons-container">
        <FaGoogle className="google-icon" />
        <FaTwitter className="google-icon" />
        <FaInstagram className="google-icon" />
        <FaYoutube className="google-icon" />
      </div>
      <p className="contact-heading">Contact</p>
    </div>
  </div>
)

export default Home
