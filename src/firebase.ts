// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1CueFXbU8CMN7psymLXovblIC1v1flFI",
  authDomain: "pylon-513e0.firebaseapp.com",
  projectId: "pylon-513e0",
  storageBucket: "pylon-513e0.firebasestorage.app",
  messagingSenderId: "820800912453",
  appId: "1:820800912453:web:06a44a330bab77b343f72c",
  measurementId: "G-E1GPSL6XZ5",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export default app
