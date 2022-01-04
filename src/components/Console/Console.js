import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserDetails } from "../../ApiCalls"
import "./Console.css";
import { useAuth } from '../../contexts/AuthContext';



function RenderProjects({ projects }) {
    const navigate = useNavigate();
    console.log(projects)

    const RenderProjectCard = ({ project }) => {
        return (
            <div className="project_card" onClick={() => { navigate("/projecthome/" + project.id) }}>
                <div className="project-card-title">
                    <h3>{project.projectName}</h3>
                </div>
                <div className="project-card-description">
                    <p>{project.projectDescription}</p>
                </div>
            </div>
        )
    }


    return (
        <div className="dashboard_projects">
            {projects.map((project, index) => {
                if (index % 4 === 0) {
                    return (
                        <div className="dashboard_projects_row" key={index}>
                            <RenderProjectCard project={project} />
                            {projects[index + 1] ? <RenderProjectCard project={projects[index + 1]} /> : null}
                            {projects[index + 2] ? <RenderProjectCard project={projects[index + 2]} /> : null}
                            {projects[index + 3] ? <RenderProjectCard project={projects[index + 3]} /> : null}
                        </div>
                    )
                }
            })}
        </div>
    )
}












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
        // console.log(userDetails)
        navigate("/newproject", { state: { user: userDetails } })
    }



    return (
        <div className="dashboard">
            {userDetails ? (
                <div className="dashboard_content">
                    <div className="dashboard_new_project">
                        <button onClick={newProject}>+ New Project</button>
                    </div>
                    {/* <div className="dashboard_project_overview">

                    </div> */}
                    {userDetails.projectsList.length > 0 ? (<RenderProjects projects={userDetails.projectsList} />) : (null)}

                </div>) : (<div className="loading">Loading</div>)
            }
        </div>
    );
}
export default Console;