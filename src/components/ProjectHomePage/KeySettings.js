import React,{useState,useEffect} from 'react'
import axios  from 'axios';

import {CopyToClipboard} from 'react-copy-to-clipboard'
import { useParams } from 'react-router-dom';
import {FileCopyOutlined,AssignmentOutlined} from '@material-ui/icons'
import "./keySettings.css"

export default function KeySettings() {
    const[inputValue,setInputValue]=useState("");
    const[isCopied,setIsCopied]=useState(false);
    const[disabled,setDisabled]=useState(false);
    
    const params = useParams();

    useEffect(()=>{
        console.log(params)
        async function getProjectKey(){
            const data= await fetch("https://fedstation.herokuapp.com/getProject/"+params.id)
            .then(res=>res.json())
            .then((data)=>{
                // console.log(data);
                setInputValue(data.projectKey)
            });
        }
        getProjectKey();
    },[]);

    

    async function disableKey(){
        if(disabled==false){
            try{
                const res=await axios.patch("http://fedstation.herokuapp.com/updateStatus?projectId="+params.id+"&field=isKeyDisabled&value=true")
                
                console.log(res)
            }catch(e){
                console.log(e)
            }
            
            setDisabled(true)
           
        }
        else{
            try{
                const res=await axios.patch("http://fedstation.herokuapp.com/updateStatus?projectId="+params.id+"&field=isKeyDisabled&value=false",{value:true})
                
                console.log(res)
            }catch(e){
                console.log(e)
            }
            
            setDisabled(false)
        }
        
    }

    async function regenerateKey(){
        const res=await axios.patch("http://fedstation.herokuapp.com/updateKey/"+params.id)
        console.log(res)
        
        const data= await fetch("https://fedstation.herokuapp.com/getProject/"+params.id)
            .then(res=>res.json())
            .then((data)=>{
                // console.log(data);
                setInputValue(data.projectKey)
            });
    }


    return (
        <div className='keySettings'>
            <h3>Copy Secret Key</h3>
            <hr/>
            <input className='keyvalue' type='text' value={inputValue} readOnly={true}/>
            <CopyToClipboard onCopy={()=>setIsCopied(true)} className="copy" text={inputValue}>
                <button type="button" aria-label='copy to clipboard button' className='copy'>{isCopied ? <AssignmentOutlined/> : <FileCopyOutlined/> }</button>
            </CopyToClipboard>
            <br/>
            <h3>Regenerate key</h3>
            <hr/>
            <div className='keySettingItems'>
                <div className="keySettingContainer">
                    
                    <strong style={{fontSize:"15px"}}>Regenerate the secret key</strong>
                    <button type="button" className='buttons' onClick={regenerateKey}>ReGenerate</button>
                </div>
            </div>
            <h3>Disable Key</h3>
            <hr/>
            <div className='keySettingItems'>
                <div className="keySettingContainer">
                    
                    <strong style={{fontSize:"15px", color:"#e7411b"}}>Disable the secret key</strong>
                        {/* <span style={{fontSize:"14px",display:"block"}}>Once you delete a Project, there is no going back. Please be certain.</span> */}
                   
                    <button type="button" className='buttons' onClick={disableKey}>{disabled ? "Enable" : "Disable" }</button>
                </div>
            </div>
        </div>
    )
}
