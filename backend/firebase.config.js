// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyADDmBiWE9edt4i1nO8NNx1bsFvxnuDpYM",
	authDomain: "traders-reign.firebaseapp.com",
	projectId: "traders-reign",
	storageBucket: "traders-reign.appspot.com",
	messagingSenderId: "598238890675",
	appId: "1:598238890675:web:a3b989bafaf56c007e3ec6",
	measurementId: "G-512RXQ6BRK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
