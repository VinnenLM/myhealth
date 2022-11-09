import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {initializeFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyA_w1j10dUTaMuZA35DjefDl-0fcDmx43I",
    authDomain: "myhealth-84d30.firebaseapp.com",
    projectId: "myhealth-84d30",
    storageBucket: "myhealth-84d30.appspot.com",
    messagingSenderId: "686206889343",
    appId: "1:686206889343:web:7e44cbeeb59107b723fe4a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = initializeFirestore(app, {experimentalForceLongPolling: true})

export {app, auth, db}