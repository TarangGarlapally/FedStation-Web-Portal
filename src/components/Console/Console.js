import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserDetails } from "../../ApiCalls"
import "./Console.css";
import { useAuth } from '../../contexts/AuthContext';

export const RenderProjectCard = ({ project }) => {
    return (
        <div className="project_card"
        //    onClick={() => { navigate("/projecthome/" + project.id) }}
        >
            <div className="project-card-title">
                <h3>{project.projectName}</h3>
            </div>
            <div className="project-card-description">
                <p>{project.projectDescription}</p>
            </div>
        </div>
    )
}


export function RenderProjects({ projects }) {
    // const navigate = useNavigate();
    // console.log(projects)


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

    // const navigate = useNavigate();

    // const { currentUser } = useAuth();
    const detailsDummy = {
        email: "yashuyashwanth05@gmail.com",
        fname: "yashwanth",
        id: "yashuyashwanth05",
        lname: "reddy",
        org: "VNR VJIET",
        projectsCount: 2,
        projectsList: [
            {
                id: "CALL",
                isKeyDisabled: false,
                isProjectDisabled: false,
                maxUsersSize: 1,
                modelType: { id: 4, model: 'testmodel', aggregationType: 'Normal' },
                projectDescription: "Categorizes user's photos based on the categories that they decide.",
                projectKey: "1649254513473N37PJR9",
                projectName: "categorizeAll",
                startAtTime: "1",
                triggerEvery: 2,

            },
            {
                id: "EXP_P",
                isKeyDisabled: false,
                isProjectDisabled: false,
                maxUsersSize: 1,
                modelType: { id: 4, model: 'testmodel', aggregationType: 'Normal' },
                projectDescription: "Predicts expenses based on previous month's expenses",
                projectKey: "1649254513473N37PJR10",
                projectName: "Expense Predictor",
                startAtTime: "1",
                triggerEvery: 2,

            }

        ],
    };
    const currentUser = null;
    const [userDetails, setUserDetails] = useState(detailsDummy);

    useEffect(() => {
        const userId = currentUser ? currentUser.email.split("@")[0] : "yashuyashwanth05";

        console.log(userId)
        if (userId) {
            getUserDetails(userId)
                .then(res => {
                    setUserDetails(res.data)
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [currentUser]);

    // const newProject = () => {
    //     // console.log(userDetails)
    //     navigate("/newproject", { state: { user: userDetails } })
    // }



    return (
        <div className="dashboard">
            {userDetails ? (
                <div className="dashboard_content">
                    <div className="dashboard_new_project">
                        {/* <button onClick={newProject}>+ New Project</button> */}
                    </div>
                    {/* <div className="dashboard_project_overview">

                    </div> */}
                    {userDetails.projectsList.length > 0 ? (<RenderProjects projects={userDetails.projectsList} />) : (<div>No projects Found</div>)}

                </div>) : (<div className="loading">Loading</div>)
            }
        </div>
    );
}
export default Console;