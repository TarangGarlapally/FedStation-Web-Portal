import React,{useState} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {FileCopyOutlined,AssignmentOutlined} from '@material-ui/icons'
import "./keySettings.css"

export default function KeySettings() {
    const[inputValue]=useState("hi");
    const[isCopied,setIsCopied]=useState(false);
    return (
        <div className='keySettings'>
            <h3>Copy Secret Key</h3>
            <input className='keyvalue' type='text' value={inputValue}/>
            <CopyToClipboard onCopy={()=>setIsCopied(true)} className="copy" text={inputValue}>
                <button type="button" aria-label='copy to clipboard button' className='cpybtn'>{isCopied ? <AssignmentOutlined/> : <FileCopyOutlined/> }</button>
            </CopyToClipboard>
            <h3>Regenerate key</h3>
            <div className='keySettingItems'>
                <div className="keySettingContainer">
                    
                    <strong>Regenerate the secret key</strong>
                        {/* <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span> */}
                   
                    <button className='regenerate'>ReGenerate</button>
                </div>
            </div>
            <h3>Disable Key</h3>
            <div className='keySettingItems'>
                <div className="keySettingContainer">
                    
                    <strong>Disable the secret key</strong>
                        {/* <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span> */}
                   
                    <button className='regenerate'>Disable</button>
                </div>
            </div>
        </div>
    )
}
