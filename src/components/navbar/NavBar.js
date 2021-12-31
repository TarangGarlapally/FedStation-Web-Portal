import React, { useState } from 'react'
import logo from "../../assets/dummy_logo.jpg"
import { useNavigate, Link } from "react-router-dom"
import { signInWithGoogle, auth, logout } from "../../firebase"
import Modal from 'react-modal';
import { createUser } from "../../ApiCalls"
import "./NavBar.css";

Modal.setAppElement('#root');

export default function NavBar() {
    const navigate = useNavigate()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({})
    const [orgName, setOrgName] = useState("")

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

    const Logout = () => {
        logout()
            .then(() => {
                localStorage.removeItem("token");
                navigate("/home")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsOpen(false)
        createUser({ ...user, org: orgName })
        navigate("/console")
    }


    return (
        <div className="home-nav">
            <div className="home-nav-left">

                <div className="nav-logo">
                    <img src={logo} alt='logo' className="nav-logo" />
                    {/* <a href="https://www.vectorstock.com/royalty-free-vector/f-letter-logo-icon-mark-vector-23741090">Vector image by VectorStock / buqancreative</a> */}
                </div>
                <button className="nav-button-normal">Fed Station</button>
                <Link to="/home" className='nav-button'>Home</Link>
                <a href="#usecases" className='nav-button'>Use Cases</a>
                <Link to="/docs" className='nav-button'>Docs</Link>
            </div>
            <div className="home-nav-right">
                {!localStorage.getItem("token") ? (
                    <>
                        <button className="nav-button" onClick={Login}>Login</button>
                        <button className="nav-button" onClick={Register}>Register</button>
                    </>
                ) : (
                    <>
                        <button className="nav-button" onClick={() => navigate("/console")}>Console</button>
                        <button className="nav-button" onClick={Logout}>Logout</button>
                    </>
                )}
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
