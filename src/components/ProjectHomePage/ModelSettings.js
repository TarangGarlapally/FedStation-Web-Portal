import React,{useState,useEffect} from 'react'
import "./modelSettings.css"

export default function ModelSettings() {
    const[details,setDetails]=useState([]);
    const[model,setModel]=useState([]);

    useEffect(()=>{
        async function getModelDetails(){
            const data= await fetch("https://fedstation.herokuapp.com/getProject/sdfsdf")
            .then(res=>res.json())
            .then((data)=>{
                setDetails(data);
                setModel(data.modelType)
            });
        }
        getModelDetails();
        
    },[]);

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
                            <h6>Recieve at time  </h6><br/>
                            <div><h6>Trigger Every</h6><br/></div>
                        </div>
                        <div className='value'>
                        <br/><h6>{model.model}</h6><br/>
                            <h6>{model.aggregationType}</h6><br/>
                            <div className='editable'>
                                <h6>{details.maxUsersSize}</h6>
                                <button className='edit'>edit</button>
                            </div><br/>
                            <h6>{details.startAtTime}</h6><br/>
                            <h6>{details.recieveAt}hi</h6><br/>
                            <div className='editable'>
                                <h6>{details.triggerEvery}</h6>
                                <button className='edit'>edit</button>
                            </div><br/>
                        </div>
                    </div>
                    
                
            </div>
            <h3>Delete Model</h3>
            <div className='modelSettingItems' style={{border:"2px solid #E7411B"}}>
                <div className="modelSettingContainer">
                    <div>
                        <strong style={{display:"block"}}>Delete this model</strong>
                        <span style={{fontSize:"14px",display:"block"}}>Once you delete a model, there is no going back. Please be certain.</span>
                    </div>
                    
                    <button className='deleteModel'>Delete</button>
                </div>
            </div>
        </div>
    )
}
