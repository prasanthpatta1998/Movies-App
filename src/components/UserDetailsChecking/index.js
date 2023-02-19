import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const UserDetailsChecking = props => {
  const {history} = props
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect path="/login" />
  }
  return <Route {...props} />
}

export default UserDetailsChecking
