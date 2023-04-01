// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3PgAITB9-97RAnwHOOuXaHqm1VOHShME",
    authDomain: "psu-covid-reporting.firebaseapp.com",
    databaseURL: "https://psu-covid-reporting-default-rtdb.firebaseio.com",
    projectId: "psu-covid-reporting",
    storageBucket: "psu-covid-reporting.appspot.com",
    messagingSenderId: "921194534827",
    appId: "1:921194534827:web:0bc4f762127e31e84d64ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;