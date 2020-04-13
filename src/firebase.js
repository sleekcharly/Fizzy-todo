import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: process.env.firebase_key,
    authDomain: "fizzy-todo.firebaseapp.com",
    databaseURL: "https://fizzy-todo.firebaseio.com",
    projectId: "fizzy-todo",
    storageBucket: "fizzy-todo.appspot.com",
    messagingSenderId: "250410650917",
    appId: "1:250410650917:web:adbd1f959cd1f15dfb9ecc"
});

export { firebaseConfig  as firebase };