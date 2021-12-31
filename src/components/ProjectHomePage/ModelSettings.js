import React from 'react'
import "./modelSettings.css"

export default function ModelSettings() {
    return (
        <div className='modelSetting'>
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
