import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./modal.css";

export default function Modal({ setOpenModal,model,setPublished }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('')
    const [contact, setContact] = useState("");
    // const [model, setModel] = useState([]);
    const[note,setNote]=useState("")
    const[placeholder,setPlaceholder]=useState("")

    const params = useParams();

    useEffect(() => {
            // console.log("incdjcjdcjjdc")
            // console.log(model.aggregationType)
            if(model.aggregationType=="Voting"){
                setNote("Your freshly generated model will be readily published")
                setPlaceholder("Write the description of your model")
            }
            else if(model.aggregationType==null){
                setNote("Your API link will be avialable to be copied")
                setPlaceholder("Write the description of your model and Please also describe API usage")
            }
        
        
    }, []);

    // setTitleErr("Title is required")
    // setDescrErr("Description is required")
    // setContactErr("Contact is required")

    // async function editMaxUser() {

    //     if (document.getElementById("selectField").value === null || document.getElementById("selectField").value === "0") {
    //         document.getElementById("editErr").innerText = "Please fill all the required values!";
    //         document.getElementById("editErr").hidden = false;
    //     }
    //     else {
    //         document.getElementById("editErr").innerText = "";
    //         document.getElementById("editErr").hidden = true;

    //         axios.patch("http://fedstation.herokuapp.com/updateTriggerOrSize/" + params.id + "?field=maxUsersSize&value=" + type)
    //         .then(res => {
    //             setMaxUser(type)
    //             setOpenModal(false)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })

    //         // const data = await fetch("https://fedstation.herokuapp.com/getProject/" + params.id)
    //         //     .then(res => res.json())
    //         //     .then((data) => {
    //         //         setDetails(data);
    //         //         setModel(data.modelType)
    //         //         setMaxUser(data.maxUsersSize)
    //         //         setTrigger(data.triggerEvery)
    //         //     });
    //         // window.location.reload();
    //         // console.log(details)
    //     }

    //     setOpenModal(false)
    // }

    async function publish(){

        const value={
            contact:contact,
            description:description,
            name:title,
            projectId:params.id
        }
        const input=JSON.stringify(value)
        if(title && description && contact){
            if(contact.length>10){
                document.getElementById("editErr1").innerText = "contact number should be 10 digits !";
                document.getElementById("editErr1").hidden = false;
            }
            else{
                document.getElementById("editErr").innerText = "";
                document.getElementById("editErr").hidden = true;
            //console.log(value)
                axios.post("http://fedstation.herokuapp.com/publishToMarketplace",value)
                    .then(response=>{
                        setPublished(true)
                        console.log(response)
                    })
                    .catch(error=>{
                        console.log(error)
                })
                setOpenModal(false)
            }
            
            
            
        }
        else{
            document.getElementById("editErr1").innerText = "Please fill all the required values !";
            document.getElementById("editErr1").hidden = false;
            
        }  
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="titles">
                    <h3>Publish Model</h3>
                    <h7>This section enable user to upload models to market place </h7>
                </div>
                <div style={{marginTop:"10px"}}>
                    <h5>Title</h5>
                    <h7>Choose title carefully for your model</h7>
                    <input type="text" id='title' style={{marginTop:"5px",height:"43px",width:"300px"}} onChange={(e)=>{
                        setTitle(e.target.value)
                    }}/>
                    
                    <h5 style={{marginTop:"15px"}}>Description</h5>
                    {/* <h7>Write the description of your model</h7> */}
                    <textarea style={{marginTop:"5px",height:"120px",width:"300px"}} placeholder={placeholder} id='descr' onChange={(e)=>{
                        setDescription(e.target.value)
                    }}/>
                   
                    <h5 style={{marginTop:"15px"}}>Contact</h5>
                    <h7>mention your contact address so that user can contact you</h7>
                    <input type="number" style={{marginTop:"5px",height:"43px",width:"300px"}} id='contact' onChange={(e)=>{
                        if(e.target.value===""||(/[0-9]/)){
                            setContact(e.target.value)
                        }
                        
                    }}/>
                    
                    <p style={{ marginTop: "5px" }}>Note : {note}</p>
                    <p style={{ marginTop: "20px" }} id="editErr1" className='editErrMsg' hidden={true}></p>
                </div>
                {/* <div className="body">
                    <span className=''>
                        <div style={{display: "flex"}}> 
                            <span>Title</span>
                            <input type="text" style={{marginLeft:"175px",height:"43px",width:"250px"}}/>
                        </div>
                        <p style={{ marginTop: "20px" }} id="editErr" className='editErrMsg' hidden={true}></p>
                        <div style={{marginTop:"50px" ,display: "flex", alignItems: "center",justifyContent:"space-between"}}>
                            <span>Description</span>
                            <textarea style={{height:"120px",width:"250px"}}/>
                        </div>
                        <p style={{ marginTop: "20px" }} id="editErr" className='editErrMsg' hidden={true}></p>
                        <div style={{marginTop:"50px",display: "flex", alignItems: "center",justifyContent:"space-between"}}>
                            <span>Contact</span>
                            <input type="text" style={{height:"43px",width:"250px"}}/>
                        </div>
                        <p style={{ marginTop: "20px" }} id="editErr" className='editErrMsg' hidden={true}></p>
                    </span>
                </div> */}
                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button type='button' className='' style={{ marginRight: "0px" }} onClick={publish}>Publish</button>
                </div>
            </div>
        </div>
    )
}
