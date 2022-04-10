import { PanoramaSharp } from '@material-ui/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "./projectSetting.css"

export default function ProjectSettings() {

    const [details, setDetails] = useState({});
    const [user, setUser] = useState({});
    const [description,setDescription]=useState('');
    const [disabled, setDisabled] = useState(false);

    const params = useParams();

    useEffect(() => {
        async function getProjectDetails() {
            const data = await fetch("https://fedstation.herokuapp.com/getProject/" + params.id)
                .then(res => res.json())
                .then((data) => {
                    setDetails(data);
                    setUser(data.user)
                    setDescription(data.projectDescription)
                    console.log(data)
                });
        }
        getProjectDetails();

    }, []);

    async function disableProject() {
        if (disabled == false) {
            const res = await axios.patch("http://fedstation.herokuapp.com/updateStatus?projectId=" + params.id + "&field=isProjectDisabled&value=true");
            setDisabled(true)

        }
        else {
            const res = await axios.patch("http://fedstation.herokuapp.com/updateStatus?projectId=" + params.id + "&field=isProjectDisabled&value=false");
            setDisabled(false)
        }


    }
    async function handleChanges(){
        axios.patch("http://fedstation.herokuapp.com/updateDescription?projectId=" + params.id + "&description="+ description)

        await fetch("https://fedstation.herokuapp.com/getProject/" + params.id)
                .then(res => res.json())
                .then((data) => {
                    setDetails(data);
                    setUser(data.user);
                    setDescription(description)
                });
        

    }

    return (

        <div className='projectSetting'>
            <h4>General</h4>
            {/* <hr style={{height:"1px",border:"none",color:"#333",backgroundColor:"#333"}}/> */}
            <hr/>

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
                <div style={{display:"flex",alignItems:"center"}}>
                    <p style={{marginLeft:"20px"}}>Project Name</p>
                    <p style={{marginLeft:"440px"}}>{details.projectName}</p>
                </div>

                <div style={{display:"flex",alignItems:"center",marginTop:"20px"}}>
                    <p style={{marginLeft:"20px"}}>Project ID</p>
                    <p style={{marginLeft:"465px"}}>{details.id}</p>
                </div>

                <div style={{display:"flex",alignItems:"center",marginTop:"20px"}}>
                    <p style={{marginLeft:"20px"}}>Owner</p>
                    <p style={{marginLeft:"488px"}}>{user.fname + " " + user.lname}</p>
                </div>

                <div style={{display:"flex",alignItems:"",marginTop:"20px"}}>
                    <p style={{marginLeft:"20px",marginTop:"20px"}}>Project Description</p>
                    <textarea style={{width:"200px",height:"80px",marginLeft:"407px",borderRadius:"5px"}}  value={description} onChange={(e)=>{
                            setDescription(e.target.value)
                        }} /> 
                    <div style={{marginTop:"50px",marginRight:"20px"}}><input type="button" className='save' value="Save" style={{marginRight:"40px"}} onClick={handleChanges}/></div>
                </div>
                
            </div>
            <h4>Disable Project</h4>
            {/* <hr style={{height:"1px",border:"none",color:"#333",backgroundColor:"#333"}}/> */}
            <hr/>
            <div className='projectSettingItems'>
                <div className="projectSettingContainer">
                    <div>
                        <strong style={{  fontSize: "15px" ,color:"#e7411b"}}>Disable this project</strong>
                        {/* <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span> */}
                    </div>

                    <button type="button" className='delete' onClick={disableProject}>{disabled ? "Enable" : "Disable"}</button>
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
