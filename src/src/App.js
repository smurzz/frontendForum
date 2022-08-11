import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePage from './react/pages/HomePage';
import UserHomePage from './react/user/UserHomePage';

function mapStateToProps(state) {
  const { auth } = state
  return auth;
}

class App extends Component {

  render() {

    const userSession = JSON.parse(localStorage.getItem('userSession'));

    let workspace;

    if (userSession) {
      workspace = <UserHomePage user = { userSession.user }/>;
    } else {
      workspace = <HomePage />;
    }
    return (

      <div className="App">
          {workspace}
      </div>
    );
  }

}

export default connect(mapStateToProps)(App);