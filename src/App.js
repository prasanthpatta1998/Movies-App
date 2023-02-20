import {Switch, Route} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import UserDetailsChecking from './components/UserDetailsChecking'
import './App.css'
import Home from './components/Home'
import Popular from './components/Popular'
import SearchMovieRouter from './components/SearchMovieRouter'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <UserDetailsChecking exact path="/" component={Home} />
    <UserDetailsChecking exact path="/popular" component={Popular} />
    <UserDetailsChecking exact path="/search" component={SearchMovieRouter} />
  </Switch>
)

export default App
