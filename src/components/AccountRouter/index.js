import Header from '../Header'
import './index.css'

const AccountRouter = () => (
  <div className="account-details-container">
    <Header boolValue="false" />
    <div className="account-container">
      <h1 className="account-heading">Account</h1>
      <hr />
      <div className="memberShip-container">
        <p className="membership-heading">Member Ship</p>
        <div className="member-account-details">
          <p className="member-userName">UserName</p>
          <p className="member-password">
            Password: <span>*********</span>
          </p>
        </div>
      </div>
      <hr />
      <div className="memberShip-container">
        <p className="membership-heading">Plan Details</p>
        <div className="member-account-details">
          <p className="member-userName">Premium</p>
          <p className="quality-type">Ultra HD</p>
        </div>
      </div>
      <hr />
      <button type="button">Logout</button>
    </div>
  </div>
)
export default AccountRouter
