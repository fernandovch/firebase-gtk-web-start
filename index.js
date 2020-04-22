// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

// Add Firebase project configuration object here
// var firebaseConfig = {};
const firebaseConfig = {
    apiKey: "AIzaSyC1VFJGZzNdjII87giPg1Z9LnSrRIngdqs",
    authDomain: "fir-web-codelab-4f752.firebaseapp.com",
    databaseURL: "https://fir-web-codelab-4f752.firebaseio.com",
    projectId: "fir-web-codelab-4f752",
    storageBucket: "fir-web-codelab-4f752.appspot.com",
    messagingSenderId: "444406181494",
    appId: "1:444406181494:web:901bcebe0d8252ae033957"
  };

firebase.initializeApp(firebaseConfig);

// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    }
  }
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

startRsvpButton.addEventListener("click", 
  ()=>{

    if(firebase.auth().currentUser){
      firebase.auth().signOut();
    }else{
      ui.start("#firebaseui-auth-container", uiConfig)
    }      
});

firebase.auth().onAuthStateChanged(
  (usuario)=>{
    if(usuario){
      startRsvpButton.textContent="LOGOUT";
    }else{
      startRsvpButton.textContent="RSVP";
    }
  }
);

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    firebase.firestore().collection("guestbook").add({
      text:input.value,
      timestamp:Date.now(),
      name: firebase.auth().currentUser.displayName,
      userID:firebase.auth().currentUser.uid
    });

    input.value="";
    return false;
});






















