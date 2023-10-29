import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBq9R9uGRLdO1iBk_yIiZc7n7Y3NfAXABA",
    authDomain: "bluetab-c03ca.firebaseapp.com",
    projectId: "bluetab-c03ca",
    storageBucket: "bluetab-c03ca.appspot.com",
    messagingSenderId: "1099500009107",
    appId: "1:1099500009107:web:09b38bd51627a0f5de7f66",
    measurementId: "G-4LQX7BX3WL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
