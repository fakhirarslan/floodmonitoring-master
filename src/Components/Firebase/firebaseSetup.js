import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDmEAQaFnZojOcIygpSZsVP49Gm_wANwzQ",
    authDomain: "flood-monitoring-786.firebaseapp.com",
    databaseURL: "https://flood-monitoring-786.firebaseio.com",
    projectId: "flood-monitoring-786",
    storageBucket: "gs://flood-monitoring-786.appspot.com",
    messagingSenderId: "833072346857",
    appId: "1:833072346857:web:1cc70ffd80320270302278",
    measurementId: "G-W2NZC09TDF"
  };
firebase.initializeApp(firebaseConfig);
export default firebase;