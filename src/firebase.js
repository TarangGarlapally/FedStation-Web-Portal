import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, getAdditionalUserInfo } from "firebase/auth";

// import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore"
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


// const db = getFirestore();

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const user = result.user;

        const token = credential.accessToken;

        localStorage.setItem("token", token);

        const userData = {
            id: user.email.split("@")[0],
            fname: user.displayName.split(" ")[0],
            lname: user.displayName.split(" ")[1],
            email: user.email,
            projectsCount: 0,
        }

        const isNewUser = getAdditionalUserInfo(result).isNewUser

        return { userData, isNewUser: isNewUser };







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
        // const res = await auth.createUserWithEmailAndPassword(email, password);
        // const user = res.user;
        // await db.collection("users").add({
        //     uid: user.uid,
        //     name,
        //     authProvider: "local",
        //     email,
        // });
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
    return signOut(auth)
};

export {
    auth,
    // db,
    signInWithGoogle,
    signInWithEmailAndPass,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout,
};

