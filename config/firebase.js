import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getReactNativePersistence, initializeAuth } from "firebase/auth/react-native"
import { initializeFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyA_w1j10dUTaMuZA35DjefDl-0fcDmx43I",
    authDomain: "myhealth-84d30.firebaseapp.com",
    projectId: "myhealth-84d30",
    storageBucket: "myhealth-84d30.appspot.com",
    messagingSenderId: "686206889343",
    appId: "1:686206889343:web:7e44cbeeb59107b723fe4a"
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

const auth = getAuth(app)

const storage = getStorage(app)

const db = initializeFirestore(app, { experimentalForceLongPolling: true })

export { app, auth, db, storage }