import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPass, signInWithGoogle } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
function LoginSignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [user, loading, error] = useAuthState(auth);
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (loading) {
    //         // maybe trigger a loading screen
    //         return;
    //     }
    //     if (user) navigate("/dashboard");
    // }, [user, loading]);
    return (
        <div className="login">
            Login and SignUp small popup
        </div>
    );
}
export default LoginSignUp;