import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios  from 'axios';
import {Modal,Button} from 'react-bootstrap'
import "./modelSettings.css"


export default function ModelSettings() {
    const[details,setDetails]=useState([]);
    const[maxUser,setMaxUser]=useState('');
    const[trigger,setTrigger]=useState('')
    const[model,setModel]=useState([]);
    const[type,setType]=useState('')
    const[label,setLabel]=useState('')
    const[close,setClose]=useState(false)
    const[closeTrigger,setCloseTrigger]=useState(false)

    const params = useParams();

    useEffect(()=>{
        async function getModelDetails(){
            const data= await fetch("https://fedstation.herokuapp.com/getProject/"+params.id)
            .then(res=>res.json())
            .then((data)=>{
                setDetails(data);
                setModel(data.modelType)
                setMaxUser(data.maxUsersSize)
                setTrigger(data.triggerEvery)
            });
        }
        getModelDetails();
        
    },[]);

    async function editMaxUser(){
        
        const res = axios.patch("http://fedstation.herokuapp.com/updateTriggerOrSize/" + params.id + "?field=maxUsersSize&value=" + type)
        console.log(res)

        const data = await fetch("https://fedstation.herokuapp.com/getProject/" + params.id)
            .then(res => res.json())
            .then((data) => {
                setDetails(data);
                setModel(data.modelType)
                setMaxUser(data.maxUsersSize)
                setTrigger(data.triggerEvery)
            });
        window.location.reload();
        console.log(details)
        setClose(false)
    }
    
    async function editTriggerEvery(){
        const res = axios.patch("http://fedstation.herokuapp.com/updateTriggerOrSize/" + params.id + "?field=triggerEvery&value=" + type)
        console.log(res)

        const data = await fetch("https://fedstation.herokuapp.com/getProject/" + params.id)
            .then(res => res.json())
            .then((data) => {
                setDetails(data);
                setModel(data.modelType)
                setMaxUser(data.maxUsersSize)
                setTrigger(data.triggerEvery)
            });
        window.location.reload();
        console.log(details)
        setClose(false)
    }

    return (
        <div className='modelSetting'>
            <h3>Basic Details</h3>
            
            <div className='modelSettingItems'>
                    <div className='modelDetails'>
                        <div className='title'>
                        <br/><h6>Model</h6><br/>
                            <h6>Aggregation type</h6><br/>
                            <div><h6>Max Users size </h6><br/></div>
                            <h6>Start at time  </h6><br/>
                            {details.recieveAt ? <h6>Recieve at time</h6> : <br/>}
                            {/* <h6>Recieve at time  </h6><br/> */}
                            <div><h6>Trigger Every</h6><br/></div>
                        </div>
                        <div className='value'>
                        <br/><h6>{model.model}</h6><br/>
                            <h6>{model.aggregationType}</h6><br/>
                            <div className='editable'>
                                <h6>{maxUser}</h6>
                                <button className='edit' type='button' onClick={()=>{setClose(true)}}>edit</button>
                            </div><br/>
                            <h6>{details.startAtTime}</h6><br/>
                            {details.recieveAt ? <h6>{details.recieveAt}</h6> : <br/>}
                            
                            {/* <h6>{details.recieveAt}hi</h6><br/> */}
                            <div className='editable'>
                                <h6>{trigger}</h6>
                                <button className='edit' type="button" onClick={()=>{setCloseTrigger(true)}}>edit</button>
                            </div><br/>
                        </div>
                    </div>
                    
                
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
            </div> */}
            <div>
                {close? <span>
                    <div>

                        <h3 style={{ textAlign: "center", marginTop: "30px" }}>Edit Max User Size</h3>
                    </div>
                    <div className='modelSettingItems1'>
                        <div>
                            <strong style={{ marginLeft: "250px" }}>Max User Size</strong>
                            {/* <input className='editFeild' type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} /> */}
                            <select className='editFeild' value={type} onChange={(e)=>{
                                let index = e.nativeEvent.target.selectedIndex;
                                let label = e.nativeEvent.target[index].text;
                                let value = e.target.value;
                                setType(value)
                                setLabel(label)
                            }} style={{ 'width': 'px' }}>
                                <option value='0'>Select Any</option>
                                <option value='1'>0-50</option>
                                <option value='2'>50-100</option>
                                <option value='3'>100-150</option>
                            </select>
                        </div>

                        <div style={{ marginLeft: "370px", marginTop: "30px" }}>
                            <button type='button' className='btn1' style={{ marginRight: "10px" }} onClick={editMaxUser}>Edit</button>
                            <button type='button' className='btn2' onClick={()=>{setClose(false)}}>Close</button>
                        </div>
                        
                    </div>
                </span>:<span></span>
                }
            </div>

            <div>
                {closeTrigger? <span>
                    <div>

                        <h3 style={{ textAlign: "center", marginTop: "30px" }}>Edit </h3>
                    </div>
                    <div className='modelSettingItems1'>
                        <div>
                            <strong style={{ marginLeft: "250px" }}>Trigger Every At</strong>
                            {/* <input className='editFeild' type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} /> */}
                            <select className='editFeild' value={type} onChange={(e)=>{
                                let index = e.nativeEvent.target.selectedIndex;
                                let label = e.nativeEvent.target[index].text;
                                let value = e.target.value;
                                setType(value)
                                setLabel(label)
                            }} style={{ 'width': 'px' }}>
                                <option value='0'>Select Any</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                                <option value='11'>11</option>
                                <option value='12'>12</option>
                                <option value='13'>13</option>
                                <option value='14'>14</option>
                                <option value='15'>15</option>
                                <option value='16'>16</option>
                                <option value='17'>17</option>
                                <option value='18'>18</option>
                                <option value='19'>19</option>
                                <option value='20'>20</option>
                                <option value='21'>21</option>
                                <option value='22'>22</option>
                                <option value='23'>23</option>
                            </select>
                        </div>

                        <div style={{ marginLeft: "370px", marginTop: "30px" }}>
                            <button type='button' className='btn1' style={{ marginRight: "10px" }} onClick={editTriggerEvery}>Edit</button>
                            <button type='button' className='btn2' onClick={()=>{setCloseTrigger(false)}}>Close</button>
                        </div>
                        
                    </div>
                </span>:<span></span>
                }
            </div>
            
            
        </div>
    )
}
