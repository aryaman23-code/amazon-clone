// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAOOwb2o4VexCB71z7ezJXY4uXz_FIfRUU",
    authDomain: "ecommerce-da0b4.firebaseapp.com",
    projectId: "ecommerce-da0b4",
    storageBucket: "ecommerce-da0b4.appspot.com",
    messagingSenderId: "1042819422800",
    appId: "1:1042819422800:web:b9059d7b996dd54758cf55",
    measurementId: "G-6V5LVLRC4K"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebaseApp.auth();
  export {db, auth};



