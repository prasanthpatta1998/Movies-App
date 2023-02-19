import {Switch, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import UserDetailsChecking from './components/UserDetailsChecking'
import './App.css'
import Home from './components/Home'

const App = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <UserDetailsChecking path="/" component={Home} />
  </Switch>
)

export default App
