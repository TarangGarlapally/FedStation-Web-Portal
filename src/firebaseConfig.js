import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyD1yTCrRY5E44In5zeHZpZYpVY7wZFMYbU",
    authDomain: "fedstation-firebase.firebaseapp.com",
    projectId: "fedstation-firebase",
    storageBucket: "fedstation-firebase.appspot.com",
    messagingSenderId: "48902902726",
    appId: "1:48902902726:web:d0dcc38d5dcc1fcbe098c7",
    measurementId: "G-7KWEBT31VB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const querySnapShot = await getDocs(query(collection(db, "users"), where("uid", "==", user.uid)))
        if (querySnapShot.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithEmailAndPass = async (email, password) => {
    try {
        await signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await db.collection("users").add({
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    auth.signOut();
};

export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPass,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
};

