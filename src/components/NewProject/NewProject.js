import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Steps } from 'rsuite';
import { checkProjectIdExists, createProject } from '../../ApiCalls';
import "./NewProject.css"
import 'rsuite/dist/rsuite.min.css';

function processAndCreateProject(projectObj, userId) {
    return {
        id: projectObj.projectId,
        maxUsersSize: projectObj.userSize,
        modelType: projectObj.projectType,
        projectDescription: projectObj.projectDescription,
        projectName: projectObj.projectName,
        startAtTime: projectObj.startAtTime,
        triggerEvery: projectObj.triggerEvery,
        noOfCols: projectObj.noOfCols,
        userId: userId
    }
}


export default function NewProject(props) {

    const [startTime, setStartTime] = useState("0");
    const [triggerEvery, setTriggerEvery] = useState(1);
    const [stage, setStage] = useState(0);
    const [idstate, setIdstate] = useState(null);
    const [projectId, setProjectId] = useState("");
    const [projectObj, setProjectObj] = useState({});
    const navigate = useNavigate();
    const { state } = useLocation();

    const hourDropdown = () => {
        var comp = "";
        for (let i = 0; i < 24; i++) {
            comp += "<option value = \"" + i + "\">" + (i < 10 ? "0" + i : i) + ":00</option>";
        }
        return comp;
    }

    const triggerEveryDropdown = () => {
        var comp = "";
        for (let i = 1; i <= 12; i++) {
            comp += "<option value = \"" + i + "\">" + i + "</option>";
        }
        return comp;
    }

    // console.log(state);
    const handleNext = () => {
        if (stage < 3) {
            setStage(stage + 1);
            return;
        }
        // setProjectObj({ ...projectObj, startAtTime: parseInt(startTime.toString()) })
        // setProjectObj({ ...projectObj, triggerEvery: triggerEvery })
        // console.log(startTime, triggerEvery)
        const project = processAndCreateProject({ ...projectObj, startAtTime: parseInt(startTime.toString()), triggerEvery: triggerEvery }, state.user.email.split("@")[0]);
        createProject(project)
            .then(res => {
                console.log(res)
                navigate("/projecthome/" + projectId);
            })
            .catch(err => {
                console.log(err)
            })

    }



    useEffect(() => {
        if (document.getElementById("startAtTime") != null) document.getElementById("startAtTime").innerHTML = hourDropdown();
        if (document.getElementById("triggerEvery") != null) document.getElementById("triggerEvery").innerHTML = triggerEveryDropdown();

        if (stage === 1 && idstate !== null) {
            if (idstate === true) {
                document.getElementById("errMsg2").innerText = "Project Id exists! Please choose another one";
                document.getElementById("errMsg2").hidden = false;
            } else {
                document.getElementById("errMsg2").innerText = "";
                document.getElementById("errMsg2").hidden = true;
                setProjectObj({ ...projectObj, projectId: document.getElementById("projectId").value })
                setIdstate(null);
                handleNext();
            }
        }
    }, [stage, idstate, startTime, projectId])


    const stage1 = <div>
        <h2>Let's get started</h2>
        <h2 className="new-project-header1">Project Details</h2>
        <br />
        <label for="projectName" className="label">Project Name<span style={{ color: "red" }}>*</span></label><br />
        <input type="text" id="projectName" maxLength={32} className="new-project-input" required></input>
        <br /><br />
        <label for="projectDescription" className="label">Project Description</label><br />
        <textarea maxLength={256} rows={6} id="projectDescription" className="new-project-input"></textarea>

        <p id="errMsg1" className="errMsg" hidden></p>
        <p className="new-project-p-btn" onClick={() => {
            if (document.getElementById("projectName").value === null || document.getElementById("projectName").value === "") {
                document.getElementById("errMsg1").innerText = "Please fill all the required values!";
                document.getElementById("errMsg1").hidden = false;
            } else {
                document.getElementById("errMsg1").innerText = "";
                document.getElementById("errMsg1").hidden = true;
                setProjectObj({ ...projectObj, projectName: document.getElementById("projectName").value, projectDescription: document.getElementById("projectDescription").value })
                handleNext();
            }
        }}>Next</p>
    </div>;

    const stage2 = <div>
        <h2 className="new-project-header1">Project Details</h2>
        <br />
        <div className="project-id">
            <label for="projectId" className="label">Create a project ID<span style={{ color: "red" }}>*</span> <span className="aggMethod"> (must not include spaces, only _ allowed)</span></label><br />
            <input type="text" id="projectId" maxLength={32} className="new-project-input" required value={projectId} onInput={(e) => {
                if (e.target.value === "" || (/^[a-z0-9_]+$/i.test(e.target.value))) {
                    setProjectId(e.target.value)
                }
            }}></input>
        </div><br />
        <p id="errMsg2" className="errMsg" hidden></p><br />
        <p className="new-project-p-btn" onClick={() => {
            if (document.getElementById("projectId").value === null || document.getElementById("projectId").value === "") {
                document.getElementById("errMsg2").innerText = "Please fill all the required values!";
                document.getElementById("errMsg2").hidden = false;
            } else {
                checkProjectIdExists(document.getElementById("projectId").value).then(response => {
                    setIdstate(response.data);
                })
            }
        }}>Next</p>
    </div>;

    const [aggMethod, setAggMethod] = useState("");
    const [modelType, setModelType] = useState("");
    const [splNote, setSplNote] = useState("");

    useEffect(() => {
        if (modelType === "") {
            setAggMethod("");
        }
        else if (modelType === "ARIMA") {
            setAggMethod("Output Averaging");
            setSplNote("")
        }
        else {
            setAggMethod("Voting");
            setSplNote("")
        }
    }, [modelType])

    const stage3 = <div>
        <h2 className="new-project-header1">Model Configuration</h2>
        <br />
        <div className="project-type">
            <label for="projectType" className="label">Model Type<span style={{ color: "red" }}>*</span></label><br />
            <select id="projectType" name="projectType" className="new-project-input" required onChange={(e) => setModelType(e.target.value)}>
                <option value="" disabled selected>Select a Model Type</option>
                <option value={"LinearRegression"}>{"Linear Regression"}</option>
                <option value={"DecisionTreeClassifier"}>{"Decision Tree Clasifier"}</option>
                <option value={"ARIMA"}>{"ARIMA"}</option>
            </select>
            <p className="aggMethod">Aggregation method used: <b>{aggMethod}</b></p>
            <label for="userSize" className="label">Expected Users' Size<span style={{ color: "red" }}>*</span></label><br />
            <select id="userSize" name="userSize" className="new-project-input" required>
                <option value={"1"}>{"0-50"}</option>
            </select>
            <br /><br />
            Number of dataset columns: <span style={{ color: "red" }}>*</span><input type="number" id="noOfCols" className="new-project-input noOfColumns" min={1} required onInput={(e) => {
                if (e.target.value < 0) {
                    e.target.value = null;
                }
            }}></input>
        </div><br />
        <p id="errMsg3" className="errMsg" hidden></p>
        <p id="noteMsg" className="noteMsg">{splNote}</p>
        <p className="new-project-p-btn" onClick={() => {
            if (document.getElementById("projectType").value === null || document.getElementById("projectType").value === ""
                || document.getElementById("userSize").value === null || document.getElementById("userSize").value === ""
                || document.getElementById("noOfCols").value === null || document.getElementById("noOfCols").value === "") {
                document.getElementById("errMsg3").innerText = "Please fill all the required values!";
                document.getElementById("errMsg3").hidden = false;
            } else {
                if (document.getElementById("noOfCols").value < 1) {
                    document.getElementById("errMsg3").innerText = "The Minimum value for number of columns is 1!";
                    document.getElementById("errMsg3").hidden = false;
                }
                else {
                    document.getElementById("errMsg3").innerText = "";
                    document.getElementById("errMsg3").hidden = true;
                    setProjectObj({ ...projectObj, projectType: document.getElementById("projectType").value, userSize: parseInt(document.getElementById("userSize").value), noOfCols: document.getElementById("noOfCols").value })
                    handleNext();
                }
            }
        }}>Next</p>
    </div>;

    const stage4 = <div>
        <h2 className="new-project-header1">Model Configuration</h2>
        <br />
        <div className="project-type">
            <h3>Schedule</h3>


            <h4 className="label" style={{ marginBottom: "-15px" }}>Model Reception {modelType !== "ARIMA" ? <>and aggregation duration</> : (<></>)}</h4><br />
            Start recieving at &nbsp; &nbsp; <select id="startAtTime" name="startAtTime" className="new-project-input smallInput" onChange={(e) => { setStartTime(parseInt(e.target.value)) }} value={startTime} required>
                {hourDropdown()}
            </select>
            &nbsp; &nbsp;
            {/* <>and finish process by &nbsp; &nbsp;</> <select disabled id="endTime" name="endTime" className="new-project-input smallInput">
                <option>{((startTime + 4) % 24 < 10 ? "0" + ((startTime + 4) % 24) : ((startTime + 4) % 24)) + ":00"}</option>
            </select> */}

            {modelType !== "ARIMA" ? (<p className="aggMethod">Aggregation duration varies from model to model. </p>) : (<></>)}

            <br />
            Trigger once every &nbsp; <select id="triggerEvery" name="triggerEvery" className="new-project-input smallInput" required onChange={(e) => { setTriggerEvery(parseInt(e.target.value)) }}>
                {triggerEveryDropdown()}
            </select> &nbsp; month/s
        </div>
        <p className="new-project-p-btn" onClick={() => {

            handleNext();
        }}>Finish</p>
    </div>;




    const stages = [stage1, stage2, stage3, stage4]


    const stepsStyle = {
        width: '200px',
        display: 'inline-table',
        verticalAlign: 'top',
    };

    const eachStepStyle = {
        height: "100px"
    }

    return (
        <div className="new-project-box">
            <div className="new-project-box-form">
                {stages[stage]}
            </div>

            <div className="new-project-box-progress">
                <div style={{ marginLeft: "50%", marginTop: "25%" }}>
                    <Steps current={stage} vertical style={stepsStyle}>
                        <Steps.Item style={eachStepStyle} />
                        <Steps.Item style={eachStepStyle} />
                        <Steps.Item style={eachStepStyle} />
                        <Steps.Item style={eachStepStyle} />
                    </Steps>
                </div>
            </div>
        </div>
    )
}
