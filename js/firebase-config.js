const firebaseConfig = {
    apiKey: "AIzaSyBgC3E3Bh6BMkTzx6luZKwTsgyQIHRzOBE",
    authDomain: "school-web-dc341.firebaseapp.com",
    projectId: "school-web-dc341",
    storageBucket: "school-web-dc341.firebasestorage.app",
    messagingSenderId: "955731478975",
    appId: "1:955731478975:web:576eb1559c909ff496f90a",
    measurementId: "G-B9Q2MXV9SC"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();