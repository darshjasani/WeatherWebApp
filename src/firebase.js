// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmn-4_z6cJ3SSCAIUYqlKU_Gpchll-FkU",
  authDomain: "weatherapp-dcc56.firebaseapp.com",
  projectId: "weatherapp-dcc56",
  storageBucket: "weatherapp-dcc56.appspot.com",
  messagingSenderId: "235608135227",
  appId: "1:235608135227:web:a16f8f8dbe9cff51c06e1e",
  measurementId: "G-V0FFB8BPK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);