import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./modelTrigger.css";

export default function ModelTrigger({ setOpenModal }) {

    const [details, setDetails] = useState([]);
    const [maxUser, setMaxUser] = useState('');
    const [trigger, setTrigger] = useState('')
    const [model, setModel] = useState([]);
    const [input, setInput] = useState("")
    const [type, setType] = useState('')
    const [label, setLabel] = useState('')

    const params = useParams();

    async function editTriggerEvery() {
        if (document.getElementById("editField").value === null || document.getElementById("editField").value === "") {
            document.getElementById("editErr").innerText = "Please fill all the required values!";
            document.getElementById("editErr").hidden = false;
            console.log(document.getElementById("editField").value)
        }
        else if (Number(document.getElementById("editField").value) < 1) {
            document.getElementById("editErr").innerText = "Please enter valid number!";
            document.getElementById("editErr").hidden = false;
        }

        else {
            document.getElementById("editErr").innerText = "";
            document.getElementById("editErr").hidden = true;

            const res = axios.patch("http://fedstation.herokuapp.com/updateTriggerOrSize/" + params.id + "?field=triggerEvery&value=" + input)


            const data = await fetch("https://fedstation.herokuapp.com/getProject/" + params.id)
                .then(res => res.json())
                .then((data) => {
                    setDetails(data);
                    setModel(data.modelType)
                    setMaxUser(data.maxUsersSize)
                    setTrigger(data.triggerEvery)
                });
            window.location.reload();
            console.log()
            //setClose(false)
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
                    <h1>Edit Trigger Every</h1>
                </div>
                <div className="body">
                    <div className=''>
                        <div>
                            
                            <input id='editField' className='editFeild' type="number" required value={input} onChange={(e) => {
                                if (e.target.value === "" || (/[0-9]/)) {
                                    setInput(e.target.value)
                                }
                            }} />

                        </div>
                        <p style={{marginTop:"20px"}} id="editErr" className='editErrMsg' hidden></p>
                    </div>
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
                    <button type='button' className='btn1' style={{ marginRight: "10px" }} onClick={
                                editTriggerEvery
                            }>Edit</button>
                </div>
            </div>
        </div>
    )
}

