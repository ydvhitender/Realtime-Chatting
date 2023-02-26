import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAZezcClr822bNK3RUFgsGfrD7zdRcMIYo",
  authDomain: "whatsapz-mern.firebaseapp.com",
  projectId: "whatsapz-mern",
  storageBucket: "whatsapz-mern.appspot.com",
  messagingSenderId: "670634188828",
  appId: "1:670634188828:web:1f551769b1301b16497fd9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
