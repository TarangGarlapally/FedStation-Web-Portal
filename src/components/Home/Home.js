import React, { useEffect, useState } from 'react'
import "./Home.css"
import { signInWithGoogle, auth } from "../../firebase"
import { useNavigate } from "react-router-dom"
import { createUser } from "../../ApiCalls"
import Modal from 'react-modal';

import { useAuth } from '../../contexts/AuthContext'


Modal.setAppElement('#root');


export default function Home() {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    const [modalIsOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({})
    const [orgName, setOrgName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsOpen(false)
        createUser({ ...user, org: orgName })
        navigate("/console")
    }


    const Login = () => {
        signInWithGoogle("login")
            .then((response) => {
                navigate("/console")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const Register = () => {

        signInWithGoogle("register")
            .then((response) => {
                setUser(response)
                setIsOpen(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }




    return (
        <div className="home-container">
            <div className="home-nav">
                <div className="home-nav-left">
                    {/* <img src="" alt="logo" />
                    <div>
                        FedStation
                    </div> */}
                </div>
                <div className="home-nav-right">
                    <div className="nav-button-login">
                        <button onClick={Login}>Login</button>
                        <button onClick={Register}>Register</button>
                    </div>
                </div>

            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                contentLabel="Example Modal"
            >
                <h2>Please Enter Organisation Name</h2>
                <button onClick={() => setIsOpen(false)}>close</button>
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={(e) => { setOrgName(e.target.value) }} value={orgName} />
                    <button type="submit">Submit</button>
                </form>
            </Modal>

        </div>
    )
}
