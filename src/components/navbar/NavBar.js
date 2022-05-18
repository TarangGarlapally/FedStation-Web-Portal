import React, { useState } from 'react'
import logo from "../../assets/dummy_logo.jpg"
import { useNavigate, Link, NavLink } from "react-router-dom"
import { signInWithGoogle, logout } from "../../firebase"
import Modal from 'react-modal';
import { createUser } from "../../ApiCalls"
import "./NavBar.css";
//import { Close } from '@material-ui/icons';

Modal.setAppElement('#root');

export default function NavBar() {
    const navigate = useNavigate()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({})
    const [orgName, setOrgName] = useState("")

    const LoginRegister = () => {
        signInWithGoogle()
            .then((response) => {
                if (response.isNewUser === true) {
                    setUser(response.userData)
                    setIsOpen(true)
                }
                else {
                    navigate("/console")
                }
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
        console.log(user)
        createUser({ ...user, org: orgName })
            .then((res) => {
                navigate("/console")
            })
            .catch((err) => {
                console.log(err)
            })

    }


    return (
        <div className="home-nav">
            <div className="home-nav-left">

                <div className="nav-logo">
                    <img src={logo} alt='logo' className="nav-logo" />
                    {/* <a href="https://www.vectorstock.com/royalty-free-vector/f-letter-logo-icon-mark-vector-23741090">Vector image by VectorStock / buqancreative</a> */}
                </div>
                <button className="nav-button-normal">Fed Station</button>
                <NavLink to="/home" className={({ isActive }) => (isActive ? 'nav-button nav-button-active' : 'nav-button')}>Home</NavLink>
                <a href="/home#usecases" className='nav-button'>Use Cases</a>
                <NavLink to="/market" className={({ isActive }) => (isActive ? 'nav-button nav-button-active' : 'nav-button')}>Market</NavLink>
                <NavLink to="/docs" className={({ isActive }) => (isActive ? 'nav-button nav-button-active' : 'nav-button')}>Docs</NavLink>
            </div>
            <div className="home-nav-right">
                {!localStorage.getItem("token") ? (
                    <>
                        <button className="nav-button" onClick={LoginRegister}>Login/Register</button>
                    </>
                ) : (
                    <>
                            <NavLink className={({ isActive }) => (isActive ? 'nav-button nav-button-active' : 'nav-button')} to="/console" >Console</NavLink>
                        <button className="nav-button" onClick={Logout}>Logout</button>
                    </>
                )}
            </div>
            <Modal
                isOpen={modalIsOpen}
                // onRequestClose={() => setIsOpen(false)}
                contentLabel="Example Modal"
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.75)',
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                    },
                    content: {
                        position: 'absolute',
                        border: '1px solid #ccc',
                        inset: "unset",
                        background: 'white',
                        width: "30%",
                        height: "25%",
                        padding: "25px",
                        overflow: 'none',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '10px',
                        outline: 'none',
                        boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.5)",
                        display: 'flex',
                        flexDirection: 'column',

                    }
                }}
            >
                <div className='modal-header'>
                    <div className='modal-title'>Organisation Name</div>
                    {/* <div className='modal-close-button'><Close onClick={() => setIsOpen(false)} /></div> */}
                </div>
                <div className='modal-body'>
                    <form onSubmit={handleSubmit}>
                        <input className='org-input' type="text" onChange={(e) => { setOrgName(e.target.value) }} value={orgName} spellCheck="false" autoComplete='false' autoFocus="true" />
                        <div className='modal-buttons'>
                            <button className='org-submit-button' type="submit">Continue</button>
                            <button className='org-submit-button' type="submit">Skip</button>
                        </div>

                    </form>
                </div>
            </Modal>
        </div>
    )
}
