import React, { useEffect, useState } from 'react'
import "./Home.css"
import { signInWithGoogle, auth, logout } from "../../firebase"
import { useNavigate, Link } from "react-router-dom"
import { createUser } from "../../ApiCalls"
import Modal from 'react-modal';
import Logo from "../../assets/Get_Started.png"
import { BsLinkedin } from "react-icons/bs"
import { FaFacebookSquare, FaGithubSquare } from "react-icons/fa"
import logo from "../../assets/dummy_logo.jpg"
import useCaseLogo from "../../assets/dummy_usecase.jpg"

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




    return (
        <div className="home-container">
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
            <div className='home-body'>
                <div className='get-started'>
                    <div className='get-started-left'>
                        <div className='get-started-head1'>FedStation</div>
                        <div className='get-started-head2'>A New way for Secure Machine Learning</div>
                        <div className='get-started-tag'>Built to support all your Machine Learning needs <br /> in mobile or web applications</div>
                        <div className='get-started-buttons'>
                            <button className='get-started-button'>Get Started</button>
                            <button className='try-demo-button'>Watch Demo</button>
                            <button className='docs-button'>Docs</button>
                        </div>
                    </div>
                    <div className='get-started-right'>
                        <img src={Logo} alt='logo' className='get-started-logo' />
                    </div>
                </div>
                <div className='use-cases' id='usecases'>
                    <div className='use-cases-head'>Example Use Cases</div>
                    <div className='use-cases-body'>
                        <div className='use-cases-right'>
                            <div className='use-case-logo'>
                                <img src={useCaseLogo} alt='logo' />
                                {/* <a href="https://www.vectorstock.com/royalty-free-vector/deadline-time-management-on-road-to-success-vector-38067618">Vector image by VectorStock / JulsIst</a> */}
                            </div>
                            <div className='use-case-text'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </div>
                        </div>
                        <span className='use-case-divider'></span>
                        <div className='use-cases-left'>
                            <div className='use-case-text'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </div>
                            <div className='use-case-logo'>
                                <img src={useCaseLogo} alt='logo' />
                            </div>
                        </div>
                        <span className='use-case-divider'></span>
                        <div className='use-cases-right'>
                            <div className='use-case-logo'>
                                <img src={useCaseLogo} alt='logo' />
                            </div>
                            <div className='use-case-text'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </div>
                        </div>
                        <span className='use-case-divider'></span>
                        <div className='use-cases-left'>
                            <div className='use-case-text'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </div>
                            <div className='use-case-logo'>
                                <img src={useCaseLogo} alt='logo' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='home-footer'>
                <div className='home-footer-left'>
                    We are always improvising. &nbsp; <span className='feedback-link'>Give Feedback</span>
                </div>
                <div className='home-footer-right'>
                    <div className='footer-connect-us'>Connect with Us</div>
                    <div className='footer-social-media'>
                        <span className='social-icon'><FaFacebookSquare size={"1.5em"} /></span>
                        <span className='social-icon'><BsLinkedin size={"1.35em"} /></span>
                        <span className='social-icon'><FaGithubSquare size={"1.5em"} /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
