import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-container">
    <div className="home-background-container">
      <div className="home-linear-background">
        <Header />
        <h1 className="home-heading">Super Man</h1>
        <p className="home-description">
          Superman is a fictional superhero who first appeared in American comic
          books published by DC Comics.
        </p>
        <button type="button" className="home-button">
          Play
        </button>
      </div>
    </div>
  </div>
)

export default Home
