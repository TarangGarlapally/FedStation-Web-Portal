import React from 'react'
import "./projectSetting.css"

export default function ProjectSettings() {
    return (
        <div className='projectSetting'>
            <h3>Basic Details</h3>
            <div className='projectSettingItems'>
                HI
            </div>
            <h3>Delete Project</h3>
            <div className='projectSettingItems' style={{border:"2px solid #E7411B"}}>
                <div className="projectSettingContainer">
                    <div>
                        <strong style={{display:"block"}}>Delete this project</strong>
                        <span style={{fontSize:"14px",display:"block"}}>Once you delete a repository, there is no going back. Please be certain.</span>
                    </div>
                    
                    <button className='delete'>Delete</button>
                </div>
            </div>
            
        </div>
    )
}
