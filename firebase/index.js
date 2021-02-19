const firebaseConfig = {
    apiKey: "AIzaSyA6gywzskYMbU_T3hfJiiHxh934I6r_FE4",
    authDomain: "ranked-voting-2a75f.firebaseapp.com",
    projectId: "ranked-voting-2a75f",
    storageBucket: "ranked-voting-2a75f.appspot.com",
    messagingSenderId: "1003361989196",
    appId: "1:1003361989196:web:4dbb93655a577b12f47ae9",
    measurementId: "G-BMD15VR66W"
  }
  
import firebase from "firebase/app"
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
export default firebase