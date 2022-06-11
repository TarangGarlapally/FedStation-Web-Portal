import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./modelSettings.css"
import Modal from "../../components/ProjectHomePage/Modal";
import ModelTrigger from '../../components/ProjectHomePage/ModelTrigger';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FileCopyOutlined, AssignmentOutlined } from '@material-ui/icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import Table from 'react-bootstrap/Table'



export default function ModelSettings() {

    const [details, setDetails] = useState([]);
    const [maxUser, setMaxUser] = useState('');
    const [trigger, setTrigger] = useState('')
    const inputFile = useRef(null);
    const [model, setModel] = useState([]);
    const [showUploadNote, setShowUploadNote] = useState(false);
    const [input, setInput] = useState('')
    const [type, setType] = useState('')
    const [label, setLabel] = useState('')
    const [published, setPublished] = useState()
    const [isCopied, setIsCopied] = useState(false);
    const [isResultCopied, setIsResultCopied] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [apiPath, setApiPath] = useState(null);
    const [resultApiPath, setResultApiPath] = useState(null);
    const [modelType, setModelType] = useState(null);
    const [downUrl, setDownUrl] = useState({})
    const [modalTriggerEveryOpen, setModalTriggerEveryOpen] = useState(false);

    const params = useParams();

    useEffect(() => {
        function getModelDetails() {
            fetch("https://fedstation.herokuapp.com/getProject/" + params.id)
                .then(res => res.json())
                .then((data) => {
                    setDetails(data);
                    setModelType(data.modelType.aggregationType === null ? "Special" : "Normal")
                    setModel(data.modelType)
                    setMaxUser(data.maxUsersSize)
                    setTrigger(data.triggerEvery)
                    setInput(data.triggerEvery)
                    setPublished(data.isPublished)
                    setApiPath("https://fedstation-ml-service.herokuapp.com/specialCaseTimeSeries/" + data.id + "/predict/")
                    setResultApiPath("https://fedstation-ml-service.herokuapp.com/getModelResult/" + data.id)

                    if (data.maxUsersSize === 1) {
                        setLabel("0-50")
                    }
                    else if (data.maxUsersSize === 2) {
                        setLabel("50-100")
                    }
                    else {
                        setLabel("100-150")
                    }
                });
        }
        getModelDetails();
        if (modelType !== 'Special') {
            axios.get("https://fedstation-ml-service.herokuapp.com/downloadGlobalModelURL/" + params.id)
                .then((data) => {
                    setDownUrl(data.data.response)
                })
                .catch(e => {
                    console.log(e)
                })
        }

    }, []);

    //console.log(published)
    async function handleChange() {
        console.log(document.getElementById("editField").value)
        if (document.getElementById("editField").value === null || document.getElementById("editField").value === "") {
            document.getElementById("editErr").innerText = "Please fill all the required values!";
            document.getElementById("editErr").hidden = false;
            console.log(document.getElementById("editField").value)

        }
        else if (Number(document.getElementById("editField").value) < 1) {
            document.getElementById("editErr").innerText = "Please enter valid number!";
            document.getElementById("editErr").hidden = false;
        }
        else {
            document.getElementById("editErr").innerText = "";
            document.getElementById("editErr").hidden = true;

            axios.patch("https://fedstation.herokuapp.com/updateTriggerOrSize/" + params.id + "?field=triggerEvery&value=" + input)
            // .then(res=>{
            //     setInput(input)
            // })

            axios.patch("https://fedstation.herokuapp.com/updateTriggerOrSize/" + params.id + "?field=maxUsersSize&value=" + type)
                .then(res => {
                    setMaxUser(type)
                    // setLabel(label)
                })
            console.log(label)

            await fetch("https://fedstation.herokuapp.com/getProject/" + params.id)
                .then(res => res.json())
                .then((data) => {
                    setDetails(data);
                    setModel(data.modelType)
                    setMaxUser(data.maxUsersSize)
                    setTrigger(input)
                })

            // alert("Changes Saved")
            mytoast("Updated Model Settings","success")
        }
        // if (document.getElementById("selectField").value === null || document.getElementById("selectField").value === "0") {
        //     document.getElementById("editErr").innerText = "Please fill all the required values!";
        //     document.getElementById("editErr").hidden = false;
        // }
        // else {
        //     document.getElementById("editErr").innerText = "";
        //     document.getElementById("editErr").hidden = true;


        // }


    }

    async function downloadGlbMdl() {

        //console.log(downUrl, "this is url")

        var link = document.createElement("a");

        link.href = downUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const clickFile = () => {
        inputFile.current.click();
    }

    async function handleFile(e) {
        var file = e.target.files[0];
        var formData = new FormData();
        console.log("handling file")
        formData.append("file", file);
        formData.append("id", details.id);
        axios.post("https://fedstation-ml-service.herokuapp.com/uploadInputProcessFile", formData)
            .then(res => {
                console.log(res)
                setShowUploadNote(true)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const renderTime = (time) => {

        if (time === 0) {
            return "12:00 AM"
        }
        else if (time < 12) {
            return time + ":00 AM"
        }
        else if (time === 12) {
            return "12:00 PM"
        }
        else {
            return (time - 12) + ":00 PM"
        }
    }

    const mytoast = (message, type) => {
        if (type === "success") {
            return toast.success(message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: 0,
            });
        }
        else if (type === "warning") {
            return toast.warn(message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: 0,
            });
        }
    }

    return (
        <div className='modelSetting'>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
            />
            <h3 style={{ marginTop: "1%" }}>Model Settings</h3>
            {/* <hr style={{height:"1px",border:"none",color:"#333",backgroundColor:"#333"}}/> */}
            <hr />
            {/* <div className='modelSettingItems'>
                    <div className='modelDetails'>
                        <div className='title'>
                            <br/><p>Model</p><br/><br/>
                            <p>Aggregation type</p><br/><br/>
                            
                            <p >Start at time  </p><br/><br/>
                            {details.recieveAt ? <div><p>Recieve at time</p><br/><br/></div> : <span></span>}
                            <p>Trigger Every</p><br/><br/>
                            <p>Max Users size </p><br/>
                        </div>
                        <div className='value'>
                            <br/><p>{model.model}</p><br/><br/>
                            <p>{model.aggregationType}</p><br/><br/>
                            
                            <p>{details.startAtTime}</p><br/>
                            {details.recieveAt ?<div>
                                <p>{details.recieveAt}</p><br/>
                            </div>  : <span></span>} */}
            {/* <div className='editable'>
                                <p>{maxUser}</p>
                                <button className='edit' type='button' onClick={() => setModalOpen(true)}>Edit</button>
                            </div><br/> */}
            {/* <div className='editable'>
                                <p>{trigger}</p>
                                <button className='edit' type='button' onClick={() => setModalTriggerEveryOpen(true)}>Edit</button>
                            </div><br/> */}
            {/* <br/><div>
                                <input type="number" id="editField" className='editField' value={input} style={{width:"50px"}} onChange={(e)=>{
                                    if(e.target.value===""||(/[0-9]/)){
                                        setInput(e.target.value) 
                                    }
                                    }}/>
                                
                            </div><br/><br/>
                            <div>
                                <select id='selectField' className='editField' value={type} onChange={(e) => {
                                    let index = e.nativeEvent.target.selectedIndex;
                                    let label = e.nativeEvent.target[index].text;
                                    let value = e.target.value;
                                    setType(value)
                                    setLabel(label)
                                }} style={{ 'width': 'fit-content',height:"fit-content",padding:"px",border:"none",fontSize:"1.5rem" }}>
                                    <option style={{padding:"10px"}} value={maxUser}>{maxUser}</option>
                                    <option value='1'>0-50</option>
                                    <option value='2'>50-100</option>
                                    <option value='3'>100-150</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>
                    
                    
            </div> */}
            <div className='modelSettingItems'>
                <div style={{ display: "flex", alignItems: "center", width: "50%", justifyContent: "space-between" }}>
                    <p style={{ marginLeft: "20px" }}>Model</p>
                    <p>{model.model}</p>
                </div>

                {model.aggregationType !== null ? (<div style={{ display: "flex", alignItems: "center", marginTop: "30px", width: "50%", justifyContent: "space-between" }}>
                    <p style={{ marginLeft: "20px" }}>Aggregation type</p>
                    <p style={{ marginLeft: "400px" }}>{model.aggregationType}</p>
                </div>) : (<></>)}

                <div style={{ display: "flex", alignItems: "center", marginTop: "30px", width: "50%", justifyContent: "space-between" }}>
                    <p style={{ marginLeft: "20px" }}>Start at time </p>
                    <p>
                        {renderTime(parseInt(details.startAtTime))}
                    </p>
                </div>

                {/* {model.aggregationType !== null ? (<div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                    {details.recieveAt ? <div><p style={{ marginLeft: "20px" }}>Recieve at time</p></div> : <span></span>}
                    {details.recieveAt ? <div>
                        <p style={{ marginLeft: "450px" }}>{details.recieveAt}</p>
                    </div> : <span></span>}
                </div>) : (<></>)} */}

                <div style={{ display: "flex", alignItems: "center", marginTop: "30px", width: "50%", justifyContent: "space-between" }}>
                    <p style={{ marginLeft: "20px" }}>Trigger Every</p>
                    <span style={{ display: "flex", width: "15%", height: "100%", justifyContent: "space-between", alignItems: "center" }}><input type="number" id="editField" className='editField' value={input} style={{ display: "flex", width: "45%", fontSize: "1rem", lineHeight: "1.2rem" }} onChange={(e) => {
                        if (e.target.value === "" || (/[0-9]/)) {
                            setInput(e.target.value)
                        }
                    }} /> months</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", marginTop: "30px", width: "50%", justifyContent: "space-between", height: "30px" }}>
                    <p style={{ marginLeft: "20px" }}>Max Users size</p>
                    <select id='selectField' className='editField' value={type} onChange={(e) => {
                        let index = e.nativeEvent.target.selectedIndex;
                        let label = e.nativeEvent.target[index].text;
                        let value = e.target.value;
                        setType(value)
                        setLabel(label)
                    }} style={{ border: "none", fontSize: "1rem", height: "100%", width: "13%", cursor: "pointer" }}>
                        <option style={{ padding: "10px" }} value={maxUser}>{label}</option>
                        <option value='1'>{"0-50"}</option>
                        <option value='2'>{"50-100"}</option>
                        <option value='3'>{"100-150"}</option>
                    </select>
                </div>
            </div>
            <div style={{ marginTop: "40px" }}>
                <p style={{ marginLeft: "40px" }} id="editErr" className='editErrMsg' hidden={true}></p>
                <input className='edit' style={{ marginLeft: "40px", marginTop: "0px" }} type="submit" value="Save" onClick={handleChange} />
            </div>
            <br /><br />
            <h3>Publish Model</h3>
            <hr />
            <div style={{ width: "100%", display: "flex" }}>
                <strong style={{ fontSize: "15px", marginLeft: "20px", width: "60%" }}>Publish model to market place by entering the details of the model</strong>
                {published ? (<button type="button" className='disableBtn' disabled >Already Published</button>) : (<button type="button" className='publishBtn' onClick={() => setModalOpen(true)}>Publish</button>)}

            </div>
            {/* <h3>Delete Model</h3>
            <div className='modelSettingItems' style={{border:"2px solid #E7411B"}}>
                <div className="modelSettingContainer">
                    <div>
                        <strong style={{display:"block"}}>Delete this model</strong>
                        <span style={{fontSize:"14px",display:"block"}}>Once you delete a model, there is no going back. Please be certain.</span>
                    </div>
                    
                    <button className='deleteModel'>Delete</button>
                </div>
            </div> 
            
                (e)=>{
                                    setInput(e.target.value)
                                    axios.patch("https://fedstation.herokuapp.com/updateTriggerOrSize/" + params.id + "?field=triggerEvery&value=" + input)
                                    .then(res => {
                                        setInput(e.target.value)
                                    })
                                    
                                    }

            */}
            <h3 style={{ marginTop: "20px" }}>{modelType && modelType !== "Special" ? ('Global Model') : ('Predictions')}</h3>
            {/* <hr style={{height:"1px",border:"none",color:"#333",backgroundColor:"#333"}}/> */}
            <hr />
            {modelType && modelType !== "Special" && <div className='projectSettingItems'>
                <div className="projectSettingContainer">
                    <div style={{ width: "60%" }}>
                        <strong style={{ fontSize: "15px", color: "#", marginLeft: "20px" }}>Download Global Model</strong>
                        {/* <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span> */}
                    </div>
                    <button type='button' className='publishBtn' onClick={downloadGlbMdl}>Download</button>

                </div>
            </div>}

            {modelType && modelType === "Special" && <div className='projectSettingItems'>
                <div className="projectSettingContainer">
                    <div style={{ width: "60%" }}>
                        <strong style={{ fontSize: "15px", color: "#", marginLeft: "20px" }}>Copy the API End Point for Predictions</strong>
                        <span style={{ fontSize: "14px", display: "block", marginLeft: "20px" }}>Please refer to docs on usage of the endpoint</span>
                    </div>
                    <div style={{ width: "20%", display: "flex", justifyContent: "center" }}>
                        <CopyToClipboard onCopy={() => setIsCopied(true)} className="copy" style={{ position: "initial" }} text={apiPath}>
                            <button type="button" aria-label='copy to clipboard button' className='copy'>{isCopied ? <AssignmentOutlined /> : <FileCopyOutlined />}</button>
                        </CopyToClipboard>
                    </div>

                </div>
            </div>}

            <hr />

            {modelType && modelType !== "Special" &&
                <>
                    <div className='projectSettingItems' style={{ height: "25%" }}>
                        <div className="projectSettingContainer" style={{ height: "100%" }}>
                            <div style={{ width: "60%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <strong style={{ fontSize: "15px", color: "#", marginLeft: "20px" }}>Access Global model using an API</strong>
                                <br />
                                <div style={{display:"flex",width:"100%",height:"45%",alignItems:"center"}}>
                                    <button type='button' className='upload-input-pro-btn' style={{ marginLeft: "20px" }} onClick={clickFile}>Upload Input Processing File</button>
                                    {showUploadNote && <span className='upload-note'>Successfully Uploaded. <br/> Uploading another file will overwrite the previous one.</span>}
                                </div>
                                <input type='file' className='upload-input-pro' style={{display:"none"}} ref={inputFile} onClick={(e)=>{e.target.value=''}} onChange={(e) => { handleFile(e); }} accept=".py" />
                                <p style={{ fontSize: "14px", display: "block", marginLeft: "20px" }}>Note: In order to access this API, you need to upload an <b>Input Processing File</b>.</p>
                                <span style={{ fontSize: "14px", display: "block", marginLeft: "20px" }}>Please refer to docs to know more about this method</span>
                            </div>
                            <div style={{ width: "15%", height: "100%", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                                <CopyToClipboard onCopy={() => setIsResultCopied(true)} className="copy" text={resultApiPath}>
                                    <button type="button" aria-label='copy to clipboard button' className='copy'>{isResultCopied ? <AssignmentOutlined /> : <FileCopyOutlined />}</button>
                                </CopyToClipboard>
                            </div>

                        </div>
                    </div>
                </>
            }


            {modalOpen && <Modal setOpenModal={setModalOpen} model={model} setPublished={setPublished} />}
            {modalTriggerEveryOpen && <ModelTrigger setOpenModal={setModalTriggerEveryOpen} setTrigger={setTrigger} />}
        </div>
    )
}
