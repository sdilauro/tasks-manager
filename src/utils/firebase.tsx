import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr8VE8xVoinYDX8VZK2JMut2xewzapM0s",
  authDomain: "sdl-tasks.firebaseapp.com",
  databaseURL: "https://sdl-tasks-default-rtdb.firebaseio.com",
  projectId: "sdl-tasks",
  storageBucket: "sdl-tasks.appspot.com",
  messagingSenderId: "622207236414",
  appId: "1:622207236414:web:0e06b72c1adf1fa56d146f",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
