// Import the Firebase modules that you need in your app.
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import 'firebase/datastore';

// Initalize and export Firebase.
var config = {
    apiKey: "AIzaSyApv1ZVr08yPEJz9QlzjTLKwmIHNG4cs9Q",
    authDomain: "quizsocial-5e514.firebaseapp.com",
    databaseURL: "https://quizsocial-5e514.firebaseio.com",
    projectId: "quizsocial-5e514",
    storageBucket: "",
    messagingSenderId: "425842162656"
  };
export default firebase.initializeApp(config);