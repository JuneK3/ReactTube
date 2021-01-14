import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPage';
import VideoDetail from './components/views/VideoDetail/VideoDetail';
import SubscriptionPage from './components/SubscriptionPage/SubscriptionPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Auth(LandingPage, null)} />
        <Route exact path='/login' component={Auth(LoginPage, false)} />
        <Route exact path='/register' component={Auth(RegisterPage, false)} />
        <Route
          exact
          path='/video/upload'
          component={Auth(VideoUploadPage, true)}
        />
        <Route
          exact
          path='/video/:videoId'
          component={Auth(VideoDetail, null)}
        />
        <Route
          exact
          path='/subscription'
          component={Auth(SubscriptionPage, null)}
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
