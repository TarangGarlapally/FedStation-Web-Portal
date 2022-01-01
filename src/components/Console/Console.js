import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserDetails } from "../../ApiCalls"
import "./Console.css";
import { useAuth } from '../../contexts/AuthContext';
function Console() {

    const navigate = useNavigate();

    const { currentUser } = useAuth();
    const [userDetails, setUserDetails] = useState();

    useEffect(() => {
        const userId = currentUser ? currentUser.email.split("@")[0] : null;
        if (userId) {
            getUserDetails(userId)
                .then(res => {
                    setUserDetails(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [currentUser]);

    const newProject = () => {
        navigate("/newproject", { state: { user: userDetails } })
    }


    return (
        <div className="dashboard">
            {userDetails ? (
                <div className="dashboard_content">
                    <div className="dashboard_new_project">
                        <button onClick={newProject}>+ New Project</button>
                    </div>
                    <div className="dashboard_project_overview">

                    </div>
                    {userDetails.projectsList.length > 0 ? (<div className="dashboard_projects">
                        <Link to="/projecthome/userAnalytics">

                            <div className="dashboard_project">
                                <div className="dashboard_project_name">
                                    <h3>{userDetails.projectsList[0].projectName}</h3>
                                </div>
                            </div>
                        </Link>
                    </div>) : (null)}
                </div>) : (<div>Loading</div>)
            }
        </div>
    );
}
export default Console;