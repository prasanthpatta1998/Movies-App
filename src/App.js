import {Switch, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import UserDetailsChecking from './components/UserDetailsChecking'
import './App.css'
import Home from './components/Home'
import Popular from './components/Popular'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <UserDetailsChecking exact path="/" component={Home} />
    <UserDetailsChecking exact path="/popular" component={Popular} />
  </Switch>
)

export default App
