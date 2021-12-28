import React from 'react'
import "./NewProject.css"

export default function NewProject() {


    const stage1 = <div>
                        <h2>Let's get started</h2>
                        <h2 className = "new-project-header1">Project Details</h2>
                        <br />
                        <label for = "projectName" className="label">Project Name</label><br />
                        <input type = "text" id = "projectName" maxLength={32} className="new-project-input"></input>
                        <br /><br />
                        <label for = "projectDescription" className="label">Project Description</label><br />
                        <textarea maxLength={256} rows={6} id = "projectDescription" className="new-project-input"></textarea>
                        <br />
                        <p className="new-project-p-btn">Next</p>
                    </div>;

    const stage2 = <div>
                        <h2 className = "new-project-header1">Project Details</h2>
                        <br />
                        <div className="project-id">
                            <label for = "projectId" className="label">Create a project ID</label><br />
                            <input type = "text" id = "projectId" maxLength={32} className="new-project-input"></input>
                        </div>
                        <p id="statusMessage"></p><br />
                        <p className="new-project-p-btn">Next</p>
                    </div>;

    return (
            <div className = "new-project-box">
                <div className = "new-project-box-form">
                    {stage2}
                </div>

                <div className = "new-project-box-progress"></div>
            </div>
    )
}
