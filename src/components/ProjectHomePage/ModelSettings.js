import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./modelSettings.css"
import Modal from "../../components/ProjectHomePage/Modal";
import ModelTrigger from '../../components/ProjectHomePage/ModelTrigger';
//import Table from 'react-bootstrap/Table'



export default function ModelSettings() {

    const [details, setDetails] = useState([]);
    const [maxUser, setMaxUser] = useState('');
    const [trigger, setTrigger] = useState('')
    const [model, setModel] = useState([]);
    const [input, setInput] = useState('')
    const [type, setType] = useState('')
    const [label, setLabel] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTriggerEveryOpen, setModalTriggerEveryOpen] = useState(false);

    const params = useParams();

    useEffect(() => {
        function getModelDetails() {
            fetch("https://fedstation.herokuapp.com/getProject/" + params.id)
                .then(res => res.json())
                .then((data) => {
                    setDetails(data);
                    setModel(data.modelType)
                    setMaxUser(data.maxUsersSize)
                    setTrigger(data.triggerEvery)
                    setInput(data.triggerEvery)
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

    }, []);

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

            axios.patch("http://fedstation.herokuapp.com/updateTriggerOrSize/" + params.id + "?field=triggerEvery&value=" + input)
            // .then(res=>{
            //     setInput(input)
            // })

            axios.patch("http://fedstation.herokuapp.com/updateTriggerOrSize/" + params.id + "?field=maxUsersSize&value=" + type)
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

            alert("Changes Saved")
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

    return (
        <div className='modelSetting'>
            <h3>Model Settings</h3>
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

                {model.model !== "ARIMA" ? (<div style={{ display: "flex", alignItems: "center", marginTop: "30px", width: "50%", justifyContent: "space-between" }}>
                    <p style={{ marginLeft: "20px" }}>Aggregation type</p>
                    <p style={{ marginLeft: "400px" }}>{model.aggregationType}</p>
                </div>) : (<></>)}

                <div style={{ display: "flex", alignItems: "center", marginTop: "30px", width: "50%", justifyContent: "space-between" }}>
                    <p style={{ marginLeft: "20px" }}>Start at time </p>
                    <p>
                        {renderTime(parseInt(details.startAtTime))}
                    </p>
                </div>

                {/* {model.model !== "ARIMA" ? (<div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
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
                                    axios.patch("http://fedstation.herokuapp.com/updateTriggerOrSize/" + params.id + "?field=triggerEvery&value=" + input)
                                    .then(res => {
                                        setInput(e.target.value)
                                    })
                                    
                                    }

            */}


            {modalOpen && <Modal setOpenModal={setModalOpen} setMaxUser={setMaxUser} />}
            {modalTriggerEveryOpen && <ModelTrigger setOpenModal={setModalTriggerEveryOpen} setTrigger={setTrigger} />}
        </div>
    )
}
