import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = () => (
  <nav className="header-container">
    <img
      src="https://res.cloudinary.com/duezhxznc/image/upload/v1676713243/Group_7399_vkfpk3.png"
      alt="login website logo"
      className="home-movies-heading"
    />
    <div className="search-container">
      <button type="button" className="header-search-button">
        <HiOutlineSearch className="search-icon" />
      </button>
      <img
        src="https://res.cloudinary.com/duezhxznc/image/upload/v1676788107/add-to-queue_1_r5cfan.png"
        className="search-icon-image"
        alt="nav-bar"
      />
    </div>
  </nav>
)

export default Header
