import firebase from "firebase"

//import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBqrt-uda92eU--p2ki9tIt01SPq7_UUOM",
    authDomain: "ecomshop-12622.firebaseapp.com",
    projectId: "ecomshop-12622",
    storageBucket: "ecomshop-12622.appspot.com",
    messagingSenderId: "976944404730",
    appId: "1:976944404730:web:31cd5fcb37ea2e92ba9143",
    measurementId: "G-013LV7H3SJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();