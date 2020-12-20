import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDWGhyaAUQfAQo4Cq8Oezn8KDRo2Czek1M",
    authDomain: "exchange-ec527.firebaseapp.com",
    projectId: "exchange-ec527",
    storageBucket: "exchange-ec527.appspot.com",
    messagingSenderId: "593586911687",
    appId: "1:593586911687:web:2f359581c6ebc9019801e2"
  };

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();