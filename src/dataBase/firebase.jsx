import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDFQ38e77NxiVmGHhlsIAn6FrfZDVg7UE0",
  authDomain: "agenda-cbd2f.firebaseapp.com",
  projectId: "agenda-cbd2f",
  storageBucket: "agenda-cbd2f.appspot.com",
  messagingSenderId: "743594711814",
  appId: "1:743594711814:web:064c383f1d55d914095c87"
};
const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();