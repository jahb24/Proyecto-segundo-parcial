import firebase from 'firebase/app'
import "firebase/firestore"

  const firebaseConfig = {
    apiKey: "AIzaSyCQ9FDKlYL1JUe-fCmBDkI0pA3KriYgz7I",
    authDomain: "vue-1-c9664.firebaseapp.com",
    projectId: "vue-1-c9664",
    storageBucket: "vue-1-c9664.appspot.com",
    messagingSenderId: "1011867837553",
    appId: "1:1011867837553:web:01fd6245a707f05fe427d0"
  };
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()