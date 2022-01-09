import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios  from 'axios';
import "./modelSettings.css"
import Modal from "../../components/ProjectHomePage/Modal";
import ModelTrigger from '../../components/ProjectHomePage/ModelTrigger';




export default function ModelSettings() {
    
    const[details,setDetails]=useState([]);
    const[maxUser,setMaxUser]=useState('');
    const[trigger,setTrigger]=useState('')
    const[model,setModel]=useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTriggerEveryOpen, setModalTriggerEveryOpen] = useState(false);

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


    return (
        <div className='modelSetting'>
            <h3>Basic Details</h3>
            
            <div className='modelSettingItems'>
                    <div className='modelDetails'>
                        <div className='title'>
                        <br/><h4>Model</h4><br/>
                            <h4>Aggregation type</h4><br/>
                            <div><h4>Max Users size </h4><br/></div>
                            <h4>Start at time  </h4><br/>
                            {details.recieveAt ? <div><h4>Recieve at time</h4><br/></div> : <span></span>}
                            <div><h4>Trigger Every</h4><br/></div>
                        </div>
                        <div className='value'>
                        <br/><h4>{model.model}</h4><br/>
                            <h4>{model.aggregationType}</h4><br/>
                            <div className='editable'>
                                <h4>{maxUser}</h4>
                                <button className='edit' type='button' onClick={() => setModalOpen(true)}>edit</button>
                            </div><br/>
                            <h4>{details.startAtTime}</h4><br/>
                            {details.recieveAt ?<div>
                                <h4>{details.recieveAt}</h4><br/>
                            </div>  : <span></span>}
                            <div className='editable'>
                                <h4>{trigger}</h4>
                                <button className='edit' type='button' onClick={() => setModalTriggerEveryOpen(true)}>edit</button>
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
            

            {modalOpen && <Modal setOpenModal={setModalOpen} />}
            {modalTriggerEveryOpen && <ModelTrigger setOpenModal={setModalTriggerEveryOpen} />}
        </div>
    )
}
