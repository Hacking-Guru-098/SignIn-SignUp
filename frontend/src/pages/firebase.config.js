// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

export const auth = getAuth(app);
