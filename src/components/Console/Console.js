import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import "./Console.css";
import { auth, db, logout } from "../../firebaseConfig";
function Console() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    // const fetchUserName = async () => {
    //     try {
    //         const query = await db
    //             .collection("users")
    //             .where("uid", "==", user?.uid)
    //             .get();
    //         const data = await query.docs[0].data();
    //         setName(data.name);
    //     } catch (err) {
    //         console.error(err);
    //         alert("An error occured while fetching user data");
    //     }
    // };
    // useEffect(() => {
    //     if (loading) return;
    //     if (!user) return navigate("/");
    //     fetchUserName();
    // }, [user, loading]);
    return (
        <div className="dashboard">

        </div>
    );
}
export default Console;