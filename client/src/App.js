import jwt_decode from 'jwt-decode';
import setAuthHeader from './utils/setAuthHeader';
import store from './store';
import styled from 'styled-components'
import { logoutUser, setCurrentUser } from './store/actions/authActions';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/shared/NavBar';
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './utils/private-route/PrivateRoute';
import ProfilePage from './pages/ProfilePage';

// check token, keeps user logged in
if (localStorage.jwtToken) {
  // set auth token header auth
  const token = localStorage.jwtToken;
  setAuthHeader(token);

  // decode token
  const decoded = jwt_decode(token);

  // set user and 'isAuthenticated'
  store.dispatch(setCurrentUser(decoded));

  // check token expire
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // expiry logout
    store.dispatch(logoutUser);

    // redirect to login page
    // window.location.href ='./login'
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <NavBar />
          <AppRoute exact path='/' component={LandingPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route path="/profile/:id" component={ProfilePage} />
          <Switch>
            <PrivateRoute exact path='/dashboard' component={DashboardPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}


 const AppRoute = styled(Route)`
  background-color: grey;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80vh;
 `