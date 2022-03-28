import { PanoramaSharp } from '@material-ui/icons';
import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import "./projectSetting.css"

export default function ProjectSettings() {

const[details,setDetails]=useState({});
const[user,setUser]=useState({});
const[disabled,setDisabled]=useState(false);

const params = useParams();

    useEffect(()=>{
        async function getProjectDetails(){
            const data= await fetch("https://fedstation.herokuapp.com/getProject/"+params.id)
            .then(res=>res.json())
            .then((data)=>{
                setDetails(data);
                setUser(data.user)
            });
        }
        getProjectDetails();
        
    },[]);

    async function deleteProject(){
        if(disabled==false){
            const res= await axios.patch("http://fedstation.herokuapp.com/updateStatus?projectId="+params.id+"&field=isProjectDisabled&value=true");
            setDisabled(true)

        }
        else{
            const res= await axios.patch("http://fedstation.herokuapp.com/updateStatus?projectId="+params.id+"&field=isProjectDisabled&value=false");
            setDisabled(false)
        }
        
                
    }
    
    return (
        
        <div className='projectSetting'>
            <h3>Basic Details</h3>
            
            <div className='projectSettingItems'>
                    <div className='projectDetails'>
                        <div>
                        <br/><h4>Project Name</h4><br/>
                            <h4>Project ID</h4><br/>
                            <h4>Project Description</h4><br/>
                            <h4>Owner</h4><br/>
                        </div>
                        <div>
                        <br/><h4>{details.projectName}</h4><br/>
                            <h4>{details.id}</h4><br/>
                            <h4>{details.projectDescription}</h4><br/>
                            <h4>{user.id}</h4><br/>
                        </div>
                    </div>
                    
                
            </div>
            <h3>Disable Project</h3>
            <div className='projectSettingItems' style={{border:"2px solid "}}>
                <div className="projectSettingContainer">
                    <div>
                        <strong style={{display:"block",fontSize:"17px"}}>Disable this project</strong>
                        {/* <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span> */}
                    </div>
                    
                    <button type="button" className='delete' onClick={deleteProject}>{disabled ? "Enable" : "Disable" }</button>
                </div>
            </div>
            {/* <h3>Delete Project</h3>
            <div className='projectSettingItems' style={{border:"2px solid #E7411B"}}>
                <div className="projectSettingContainer">
                    <div>
                        <strong style={{display:"block"}}>Delete this project</strong>
                        <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span>
                    </div>
                    
                    <button className='delete' onClick={deleteProject}>Delete</button>
                </div>
            </div> */}
        </div>
    )
}
