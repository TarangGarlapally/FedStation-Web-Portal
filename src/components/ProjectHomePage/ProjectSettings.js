import React,{useState,useEffect} from 'react'
import "./projectSetting.css"

export default function ProjectSettings() {

const[details,setDetails]=useState({});
const[user,setUser]=useState({});

    useEffect(()=>{
        async function getProjectDetails(){
            const data= await fetch("https://fedstation.herokuapp.com/getProject/sdfsdf")
            .then(res=>res.json())
            .then((data)=>{
                setDetails(data);
                setUser(data.user)
            });
        }
        getProjectDetails();
        
    },[]);
    
    return (
        
        <div className='projectSetting'>
            <h3>Basic Details</h3>
            
            <div className='projectSettingItems'>
                    <div className='projectDetails'>
                        <div>
                        <br/><h6>Project Name</h6><br/>
                            <h6>Project ID</h6><br/>
                            <h6>Project Description</h6><br/>
                            <h6>Owner</h6><br/>
                        </div>
                        <div>
                        <br/><h6>{details.projectName}</h6><br/>
                            <h6>{details.id}</h6><br/>
                            <h6>{details.projectDescription}</h6><br/>
                            <h6>{user.id}</h6><br/>
                        </div>
                    </div>
                    
                
            </div>
            <h3>Disable Project</h3>
            <div className='projectSettingItems' style={{border:"2px solid #E7411B"}}>
                <div className="projectSettingContainer">
                    <div>
                        <strong style={{display:"block"}}>Delete this project</strong>
                        {/* <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span> */}
                    </div>
                    
                    <button className='delete'>Disable</button>
                </div>
            </div>
            <h3>Delete Project</h3>
            <div className='projectSettingItems' style={{border:"2px solid #E7411B"}}>
                <div className="projectSettingContainer">
                    <div>
                        <strong style={{display:"block"}}>Delete this project</strong>
                        <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span>
                    </div>
                    
                    <button className='delete'>Delete</button>
                </div>
            </div>
            
        </div>
    )
}
