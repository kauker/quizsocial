import React, { Component } from 'react';
import Navbar from './components/Navbar/';
import Footer from './components/Footer/';

import firebase from 'firebase/app';
import firebaseApp from './firebase.js';

import './App.css'

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null
  };

  componentDidMount() {
    // Updating the `isSignedIn` and `userProfile` local state attributes when the Firebase Auth
    // state changes.
    this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
      this.setState({ isLoggedIn: !!user, user });
    });
  }
  
  componentWillUnmount() {
    // Un-registers the auth state observer.
    this.unregisterAuthObserver();
  }

  handleLogin = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebaseApp.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  handleLogout = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar user={this.state.user || {}}
                handleLogout={this.handleLogout}/>
        <section className="hero is-medium">
          <div class="hero-body">
            <div className="container">
              <h1 className="title">Enter the quiz</h1>
              <h2 className="subtitle">
                A quiz app with social media login
              </h2>
              <button className="button is-link" onClick={this.handleLogin}>
                <span class="icon"><i class="fab fa-facebook-f"></i></span><span>Login with Facebook</span>
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
