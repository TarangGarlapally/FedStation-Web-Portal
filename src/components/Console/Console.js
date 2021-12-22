import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { getUserDetails } from "../../ApiCalls"
import "./Console.css";
import { useAuth } from '../../contexts/AuthContext';
import { logout } from "../../firebase";
function Console() {

    const location = useLocation();

    const navigate = useNavigate();

    const { currentUser } = useAuth();
    const [userDetails, setUserDetails] = useState(currentUser);
    const userId = currentUser ? currentUser.id : null;

    const Logout = () => {
        logout()
            .then(() => {
                localStorage.removeItem("token");
                navigate("/home")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (userId) {
            getUserDetails(userId)
                .then(res => {
                    setUserDetails(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, []);

    const newProject = () => {
        navigate("/newproject", { state: { user: userDetails } })
    }


    return (
        <div className="dashboard">
            <div className="dashboard_nav"><button onClick={Logout}>Logout</button></div>
            <div className="dashboard_content">
                <div className="dashboard_new_project">
                    <button onClick={newProject}>+ New Project</button>
                </div>
                <div className="dashboard_project_overview">

                </div>
                <div className="dashboard_projects">

                </div>
            </div>
        </div>
    );
}
export default Console;