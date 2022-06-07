import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FileCopyOutlined, AssignmentOutlined } from '@material-ui/icons'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "./projectSetting.css"
import ModalDelete from "../../components/ProjectHomePage/ModalDelete"

export default function ProjectSettings() {

    const [details, setDetails] = useState({});
    const [user, setUser] = useState({});
    const [description, setDescription] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [apiPath, setApiPath] = useState(null);
    const [modelType, setModelType] = useState(null);
    const [downUrl, setDownUrl] = useState({})
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const params = useParams();

    useEffect(() => {
        function getProjectDetails() {
            fetch("https://fedstation.herokuapp.com/getProject/" + params.id)
                .then(res => res.json())
                .then((data) => {
                    setDetails(data);
                    setUser(data.user)
                    setDescription(data.projectDescription)
                    setDisabled(data.isProjectDisabled)
                    console.log(data)
                    setModelType(data.modelType.aggregationType === null ? "Special" : "Normal")
                    setApiPath("https://fedstation-ml-service.herokuapp.com/specialCaseTimeSeries/" + data.id + "/predict/")
                });
        }
        getProjectDetails();
        
        if (modelType !== 'Special') {
            axios.get("https://fedstation-ml-service.herokuapp.com/dowloadGlobalModelURL/"+params.id)
                .then((data) => {
                    setDownUrl(data.data.response)
                })
                .catch(e => {
                    console.log(e)
                })
        }

    }, []);

    async function disableProject() {
        if (disabled === false) {
            await axios.patch("http://fedstation.herokuapp.com/updateStatus?projectId=" + params.id + "&field=isProjectDisabled&value=" + true);
            setDisabled(true)

        }
        else {
            await axios.patch("http://fedstation.herokuapp.com/updateStatus?projectId=" + params.id + "&field=isProjectDisabled&value=" + false);
            setDisabled(false)
        }


    }
    async function handleChanges() {
        console.log(document.getElementById("editField").value)
        if (document.getElementById("editField").value === null || document.getElementById("editField").value === "") {
            document.getElementById("editErr").innerText = "Please fill all the required values!";
            document.getElementById("editErr").hidden = false;
            console.log(document.getElementById("editField").value)

        }
        else {
            document.getElementById("editErr").innerText = "";
            document.getElementById("editErr").hidden = true;
            axios.patch("http://fedstation.herokuapp.com/updateDescription?projectId=" + params.id + "&description=" + description)

            await fetch("https://fedstation.herokuapp.com/getProject/" + params.id)
                .then(res => res.json())
                .then((data) => {
                    setDetails(data);
                    setUser(data.user);
                    setDescription(description)
                });

            alert("Changes Saved")
        }

    }

    async function downloadGlbMdl() {

        //console.log(downUrl, "this is url")

        var link = document.createElement("a");

        link.href = downUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);


    }

    return (

        <div className='projectSetting'>
            <h3>Project Settings</h3>
            <h5 style={{ marginTop: "10px" }}>General</h5>
            {/* <hr style={{height:"1px",border:"none",color:"#333",backgroundColor:"#333"}}/> */}
            <hr />

            <div className='projectSettingItems'>
                {/* <div className='projectDetails'>
                    <div style={{marginLeft:"20px"}}>
                        <p>Project Name</p><br />
                        <p>Project ID</p><br />
                        
                        <p>Owner</p><br />
                        <p>Project Description</p><br />
                    </div>
                    <div style={{marginLeft:"400px"}}>
                        <br /><p>{details.projectName}</p><br />
                        <p>{details.id}</p><br />
                         */}

                {/* <p>{details.projectDescription}</p><br /> */}
                {/* <p>{user.fname + " " + user.lname}</p><br /><br/><br/>
                        <div>
                        <textarea style={{width:"200px",height:"80px"}}  value={description} onChange={(e)=>{
                            setDescription(e.target.value)
                        }} /> 
                        <input type="button" className='edit' value="submit" onClick={handleChanges}/>
                        </div><br />
                    </div>
                </div> */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ marginLeft: "20px" }}>Project Name</p>
                    <p style={{ marginLeft: "440px" }}>{details.projectName}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                    <p style={{ marginLeft: "20px" }}>Project ID</p>
                    <p style={{ marginLeft: "465px" }}>{details.id}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                    <p style={{ marginLeft: "20px" }}>Owner</p>
                    <p style={{ marginLeft: "488px" }}>{user.fname + " " + user.lname}</p>
                </div>

                <div style={{ display: "flex", marginTop: "20px" }}>
                    <p style={{ marginLeft: "20px" }}>Project Description</p>
                    <textarea style={{ width: "300px", height: "50px", marginLeft: "407px", borderRadius: "5px" }} value={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }} />
                    <div style={{ marginTop: "15px", marginRight: "20px" }}>
                        <p style={{ marginLeft: "0px" }} id="editErr" className='editErrMsg' hidden={true}></p>
                        <input type="button" id='editField' className='save' value="Save" style={{ marginRight: "40px" }} onClick={handleChanges} />
                        {/* <button id='editField' className='save' style={{marginRight:"40px"}} onClick={handleChanges}>Save</button> */}
                    </div>
                </div>

            </div>
            <h5 style={{ marginTop: "20px" }}>Disable Project</h5>
            {/* <hr style={{height:"1px",border:"none",color:"#333",backgroundColor:"#333"}}/> */}
            <hr />
            <div className='projectSettingItems'>
                <div className="projectSettingContainer">
                    <div>
                        <strong style={{ fontSize: "15px", color: "#e7411b", marginLeft: "20px" }}>Disable this project</strong>
                        {/* <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span> */}
                    </div>
                    {disabled?(<button type="button" className='publishBtn' style={{ marginLeft: "400px" }} onClick={disableProject}>Enable</button>):<button type="button" className='delete' style={{ marginLeft: "400px" }} onClick={disableProject}>Disable</button>}

                    {/* <button type="button" className='delete' style={{ marginLeft: "400px" }} onClick={disableProject}>{disabled ? "Enable" : "Disable"}</button> */}
                </div>
            </div>
            <h5 style={{ marginTop: "20px" }}>Delete Project</h5>
            <hr />
            <div className='projectSettingItems'>
                <div className="projectSettingContainer">
                    <div>
                        <strong style={{ fontSize: "15px", color: "#e7411b", marginLeft: "20px" }}>Delete this project</strong>
                        <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span>
                    </div>
                    
                    <button type="button" className='delete' style={{ marginLeft: "125px" }} onClick={()=>setModalDeleteOpen(true)} >Delete</button>
                </div>
            </div>
            <h5 style={{ marginTop: "20px" }}>{modelType && modelType !== "Special" ? ('Global Model') : ('Predictions')}</h5>
            {/* <hr style={{height:"1px",border:"none",color:"#333",backgroundColor:"#333"}}/> */}
            <hr />
            {modelType && modelType !== "Special" && <div className='projectSettingItems'>
                <div className="projectSettingContainer">
                    <div>
                        <strong style={{ fontSize: "15px", color: "#", marginLeft: "20px" }}>Download Global Model</strong>
                        {/* <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span> */}
                    </div>
                    <button type='button' className='publishBtn ' style={{ marginLeft: "370px" }} onClick={downloadGlbMdl}>Download</button>

                </div>
            </div>}

            {modelType && modelType === "Special" && <div className='projectSettingItems'>
                <div className="projectSettingContainer">
                    <div>
                        <strong style={{ fontSize: "15px", color: "#", marginLeft: "20px" }}>Copy the API End Point for Predictions</strong>
                        <span style={{ fontSize: "14px", display: "block", marginLeft: "20px" }}>Please refer to docs on usage of the endpoint</span>
                    </div>
                    <CopyToClipboard style={{ marginLeft: "370px" }} onCopy={() => setIsCopied(true)} className="copy" text={apiPath}>
                        <button type="button" aria-label='copy to clipboard button' className='copy'>{isCopied ? <AssignmentOutlined /> : <FileCopyOutlined />}</button>
                    </CopyToClipboard>

                </div>
            </div>}

            {modalDeleteOpen && <ModalDelete setOpenModal={setModalDeleteOpen}/>}
        </div>
    )
}
