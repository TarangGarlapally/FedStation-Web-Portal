import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./modal.css";

export default function Modal({ setOpenModal,setMaxUser }) {
    const [details, setDetails] = useState([]);
    const [trigger, setTrigger] = useState('')
    const [model, setModel] = useState([]);
    const [input, setInput] = useState("")
    const [type, setType] = useState('')
    const [label, setLabel] = useState('')
    const [close, setClose] = useState(false)
    const [closeTrigger, setCloseTrigger] = useState(false)

    const params = useParams();

    async function editMaxUser() {

        if (document.getElementById("selectField").value === null || document.getElementById("selectField").value === "0") {
            document.getElementById("editErr").innerText = "Please fill all the required values!";
            document.getElementById("editErr").hidden = false;
        }
        else {
            document.getElementById("editErr").innerText = "";
            document.getElementById("editErr").hidden = true;

            axios.patch("http://fedstation.herokuapp.com/updateTriggerOrSize/" + params.id + "?field=maxUsersSize&value=" + type)
            .then(res => {
                setMaxUser(type)
                setOpenModal(false)
            })
            .catch(err => {
                console.log(err)
            })

            // const data = await fetch("https://fedstation.herokuapp.com/getProject/" + params.id)
            //     .then(res => res.json())
            //     .then((data) => {
            //         setDetails(data);
            //         setModel(data.modelType)
            //         setMaxUser(data.maxUsersSize)
            //         setTrigger(data.triggerEvery)
            //     });
            // window.location.reload();
            console.log(details)
        }

        setOpenModal(false)
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                {/* <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div> */}
                <div className="titles">
                    <h2>Edit Max User Size</h2>
                </div>
                <div className="body">
                    <span className=''>
                        <div>
                            <select id='selectField' className='editField' value={type} onChange={(e) => {
                                let index = e.nativeEvent.target.selectedIndex;
                                let label = e.nativeEvent.target[index].text;
                                let value = e.target.value;
                                setType(value)
                                setLabel(label)
                            }} style={{ 'width': 'fit-content',height:"fit-content",padding:"10px",border:"none",fontSize:"1.5rem" }}>
                                <option style={{padding:"10px"}} value='0'>Choose</option>
                                <option value='1'>0-50</option>
                                <option value='2'>50-100</option>
                                <option value='3'>100-150</option>
                            </select>
                        </div>
                        <p style={{ marginTop: "20px" }} id="editErr" className='editErrMsg' hidden={true}></p>
                    </span>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button type='button' className='' style={{ marginRight: "10px" }} onClick={editMaxUser}>Edit</button>
                </div>
            </div>
        </div>
    )
}
