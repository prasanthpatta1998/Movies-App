import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'
import './index.css'

const AccountRouter = () => (
  <div className="account-details-container">
    <Header boolValue="false" />
    <div className="account-container">
      <h1 className="account-heading">Account</h1>
      <hr className="horizontal-line" />
      <div className="memberShip-container">
        <p className="membership-heading">Member Ship</p>
        <div className="member-account-details">
          <p className="member-userName">UserName</p>
          <p className="member-password">
            Password: <span>*********</span>
          </p>
        </div>
      </div>
      <hr className="horizontal-line-2" />
      <div className="memberShip-container">
        <p className="membership-heading">Plan Details</p>
        <div className="member-account-password-container">
          <p className="member-premium">Premium</p>
          <p className="quality-type">Ultra HD</p>
        </div>
      </div>
      <hr className="horizontal-line-2" />
      <button type="button" className="account-logout-button">
        Logout
      </button>
    </div>
    <div className="contact-icons-container">
      <FaGoogle className="google-icon" />
      <FaTwitter className="google-icon" />
      <FaInstagram className="google-icon" />
      <FaYoutube className="google-icon" />
    </div>
    <p className="contact-heading">Contact</p>
  </div>
)
export default AccountRouter
