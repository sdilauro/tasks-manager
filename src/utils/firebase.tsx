import { initializeApp } from "firebase/app"
import { Database, getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCr8VE8xVoinYDX8VZK2JMut2xewzapM0s",
  authDomain: "sdl-tasks.firebaseapp.com",
  projectId: "sdl-tasks",
  storageBucket: "sdl-tasks.appspot.com",
  messagingSenderId: "622207236414",
  appId: "1:622207236414:web:0e06b72c1adf1fa56d146f",
  measurementId: "G-Y7LT7H8R9Z",
}

const app = initializeApp(firebaseConfig)
export const db:any = getDatabase(app)
