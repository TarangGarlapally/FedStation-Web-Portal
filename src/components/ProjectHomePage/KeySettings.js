import React,{useState,useEffect} from 'react'
import { Axios } from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {FileCopyOutlined,AssignmentOutlined} from '@material-ui/icons'
import "./keySettings.css"

export default function KeySettings() {
    const[inputValue,setInputValue]=useState("");
    const[isCopied,setIsCopied]=useState(false);
    

    useEffect(()=>{
        async function getProjectKey(){
            const data= await fetch("https://fedstation.herokuapp.com/getProject/sdfsdf")
            .then(res=>res.json())
            .then((data)=>{
                setInputValue(data.projectKey)
            });
        }
        getProjectKey();
    },[]);

    

    // const disableKey=()=>{
    //     const data= await fetch("https://fedstation.herokuapp.com/updateStatus/sdfsdf/isKeyDisabled/")
    //     .then(res=>res.json())
    //     .then((data)=>{
    //         if(data.isKeyDisabled!=true){

    //         }
    //     })
    // }


    return (
        <div className='keySettings'>
            <h3>Copy Secret Key</h3>
            <input className='keyvalue' type='text' value={inputValue}/>
            <CopyToClipboard onCopy={()=>setIsCopied(true)} className="copy" text={inputValue}>
                <button type="button" aria-label='copy to clipboard button' className='cpybutton'>{isCopied ? <AssignmentOutlined/> : <FileCopyOutlined/> }</button>
            </CopyToClipboard>
            <h3>Regenerate key</h3>
            <div className='keySettingItems'>
                <div className="keySettingContainer">
                    
                    <strong>Regenerate the secret key</strong>
                    <button className='buttons'>ReGenerate</button>
                </div>
            </div>
            <h3>Disable Key</h3>
            <div className='keySettingItems'>
                <div className="keySettingContainer">
                    
                    <strong>Disable the secret key</strong>
                        {/* <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span> */}
                   
                    <button className='buttons'>Disable</button>
                </div>
            </div>
        </div>
    )
}
