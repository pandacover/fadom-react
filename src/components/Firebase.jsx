import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyApeNvN6am3B9eVBDp33pSsEsPtmD53JqM",
  authDomain: "animu-db.firebaseapp.com",
  projectId: "animu-db",
  storageBucket: "animu-db.appspot.com",
  messagingSenderId: "217024500000",
  appId: "1:217024500000:web:cfde7634f3ac7a6dda0745",
  measurementId: "G-768QFH963P"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.database();
export const cdb = firebase.firestore();