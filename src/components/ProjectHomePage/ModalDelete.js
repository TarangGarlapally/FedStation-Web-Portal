import React, { useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./modalDelete.css";

export default function ModalDeleteOpen({setOpenModal}) {
  const params = useParams();
  const navigate = useNavigate();

    function deleteProject(){
      //const navigate = useNavigate();
    //   if(axios.delete(`http://fedstation.herokuapp.com/deleteProject/`+params.id)){
    //     navigate("/console")
    //   }
      axios.delete(`http://fedstation.herokuapp.com/deleteProject/`+params.id)
      .then(res=>{
        if(res.status==200){
            navigate("/console")
        }
        // console.log(res.status)
      }).catch(err=>console.log(err))
      
      
    }

  return (
    <div className="modalBackground1">
    <div className="modalContainer1">
        <div className="titleCloseBtn">
            <button
                onClick={() => {
                    setOpenModal(false);
                }}
            >
                X
            </button>
        </div>
        <div className="titles1">
            <h2>Delete Project</h2>
        </div>
        <div className="body1">
            <div className=''>
                <div>

                    {/* <input id='editField' className='editField' type="number" style={{ textAlign: "center", border: "none" }} required value={input} placeholder={'Month/s'} onChange={(e) => {
                        if (e.target.value === "" || (/[0-9]/)) {
                            setInput(e.target.value)
                        }
                    }} /> */}

                </div>
                <p style={{ marginTop: "20px" }} id="editErr" className='editErrMsg' hidden></p>
            </div>
        </div>
        <div className="footer1">
            <button
                onClick={() => {
                    setOpenModal(false);
                }}
                id="cancelBtn"
            >
                Cancel
            </button>
            <button type='button' className='' style={{ marginRight: "10px" }} onClick={
                deleteProject
            }>Delete</button>
        </div>
    </div>
</div>
  )
}
