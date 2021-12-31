import React, { useEffect, useState } from 'react'
import "./NewProject.css"

export default function NewProject() {

    const [startTime, setStartTime] = useState("");
    const [stage, setStage] = useState(0);

    const hourDropdown = () => {
        var comp = "";
        for (let i = 0; i < 24; i++) {
           comp += "<option value = '"+i+"'>"+(i<10?"0"+i:i)+":00</option>";
        }
        return comp;
    }

    const triggerEveryDropdown = () => {
        var comp = "";
        for (let i = 1; i <= 12; i++) {
           comp += "<option value = '"+i+"'>"+i+"</option>";
        }
        return comp;
    }

    const handleNext = () => {
        if(stage<3) {
            setStage(stage+1);
            return;
        }
        alert("done");
    }



    useEffect(() => {
        if(document.getElementById("startAtTime") != null) document.getElementById("startAtTime").innerHTML = hourDropdown();
        if(document.getElementById("triggerEvery") != null) document.getElementById("triggerEvery").innerHTML = triggerEveryDropdown();
    })

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
                        <p className="new-project-p-btn" onClick={handleNext}>Next</p>
                    </div>;

    const stage2 = <div>
                        <h2 className = "new-project-header1">Project Details</h2>
                        <br />
                        <div className="project-id">
                            <label for = "projectId" className="label">Create a project ID <span className="aggMethod"> (must not include spaces, only _ allowed)</span></label><br />
                            <input type = "text" id = "projectId" maxLength={32} className="new-project-input"></input>
                        </div>
                        <p id="statusMessage"></p><br />
                        <p className="new-project-p-btn" onClick={handleNext}>Next</p>
                    </div>;

    const stage3 = <div>
                        <h2 className = "new-project-header1">Model Configuration</h2>
                        <br />
                        <div className="project-type">
                            <label for = "projectType" className="label">Type</label><br />
                            <select id = "projectType" name = "projectType" className="new-project-input">
                                <option value={"type1"}>{"Type1"}</option>
                            </select>
                            <p className = "aggMethod">Aggregation method used: <b>{"method1"}</b></p>
                            <label for = "userSize" className="label">Expected Users' Size</label><br />
                            <select id = "userSize" name = "userSize" className="new-project-input">
                                <option value={"1"}>{"0-50"}</option>
                            </select>
                            <br /><br />
                            Number of dataset columns: <input type="number" className="new-project-input noOfColumns" min={2} ></input>
                        </div>
                        <p id="statusMessage"></p><br />
                        <p className="new-project-p-btn" onClick={handleNext}>Next</p>
                    </div>;

    const stage4 = <div>
                        <h2 className = "new-project-header1">Model Configuration</h2>
                        <br />
                        <div className="project-type">
                            <h3>Schedule</h3>


                            <h4 className="label" style={{marginBottom: "-15px"}}>Model reception and aggregation duration</h4><br />
                            Start recieving at &nbsp; &nbsp; <select id = "startAtTime" name = "startAtTime" className="new-project-input smallInput" onChange={(e)=>{setStartTime(parseInt(e.target.value))}} value = {startTime}>
                            {hourDropdown()}
                            </select> &nbsp; &nbsp; and finish process by &nbsp; &nbsp; <select disabled id = "endTime" name = "endTime" className="new-project-input smallInput">
                                <option>{((startTime+4)%24<10?"0"+((startTime+4)%24):((startTime+4)%24))+":00"}</option>
                            </select>

                            <p className = "aggMethod">75% of above duration is used for model reception and 25% for aggregation </p>

                            <br /><br />
                            Trigger once every &nbsp; <select id = "triggerEvery" name = "triggerEvery" className="new-project-input smallInput">
                                {triggerEveryDropdown()}
                            </select> &nbsp; months
                        </div>
                        <p className="new-project-p-btn" onClick={handleNext}>Finish</p>
                    </div>;

    const stages = [stage1, stage2, stage3, stage4]

    return (
            <div className = "new-project-box">
                <div className = "new-project-box-form">
                    {stages[stage]}
                </div>

                <div className = "new-project-box-progress"></div>
            </div>
    )
}
