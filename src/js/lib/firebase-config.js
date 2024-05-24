import "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js"
import "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore-compat.js"

const firebaseConfig = {
  apiKey: "AIzaSyA8hPsuSHs_f4Z4vQzdizwQcv1cT2TCess",
  authDomain: "wavelink-6fb29.firebaseapp.com",
  projectId: "wavelink-6fb29",
  storageBucket: "wavelink-6fb29.appspot.com",
  messagingSenderId: "670616653391",
  appId: "1:670616653391:web:f85e10a2fb5c988b48643a",
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
