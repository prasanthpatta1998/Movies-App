import {Switch, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import UserDetailsChecking from './components/UserDetailsChecking'
import './App.css'
import Home from './components/Home'
import Popular from './components/Popular'
import SearchMovieRouter from './components/SearchMovieRouter'
import AccountRouter from './components/AccountRouter'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <UserDetailsChecking exact path="/" component={Home} />
    <UserDetailsChecking exact path="/popular" component={Popular} />
    <UserDetailsChecking exact path="/search" component={SearchMovieRouter} />
    <UserDetailsChecking exact path="/account" component={AccountRouter} />
  </Switch>
)

export default App
