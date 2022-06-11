import React from 'react'
import "./Home.css"

import Logo from "../../assets/Get_Started.png"
import { BsLinkedin } from "react-icons/bs"
import { FaFacebookSquare, FaGithubSquare } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import useCaseLogo from "../../assets/dummy_usecase.jpg"
import expenses from "../../assets/expenses.jpg"
import toxic from "../../assets/toxic.jpg"





export default function Home() {
    // const { currentUser } = useAuth()
    const navigate = useNavigate()









    return (
        <div className="home-container">
            <div className='home-body'>
                <div className='get-started' id='getstarted'>
                    <div className='get-started-left'>
                        <div className='get-started-head1'>FedStation</div>
                        <div className='get-started-head2'>A New way for Secure Machine Learning</div>
                        <div className='get-started-tag'>Built to support all your Machine Learning needs <br /> in mobile or web applications</div>
                        <div className='get-started-buttons'>
                            <button className='get-started-button' onClick={() => navigate("/console")}>Go to Console</button>
                            {/* <Link to="/watch-demo" className='try-demo-button'>Watch Demo</Link> */}
                            {/* <button className='try-demo-button' onClick={()=>navigate("/watch-demo")}>Watch Demo</button> */}
                            <button className='docs-button' onClick={() => navigate("/docs")}>Docs</button>
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
                                <img title="<a href='https://www.freepik.com/vectors/online-registration'>Online registration vector created by vectorjuice - www.freepik.com</a>" src={expenses} alt='logo' style={{"objectFit":"cover","width":"75%"}} />
                                {/* <a href="https://www.vectorstock.com/royalty-free-vector/deadline-time-management-on-road-to-success-vector-38067618">Vector image by VectorStock / JulsIst</a> */}
                            </div>
                            <div className='use-case-text'>
                                <div className='use-case-title'>
                                    Expense Tracker
                                </div>
                                <div className='use-case-description'>
                                    Day to Day expenses of a user can be very private information. Using this information to train models with or without the knowledge of the user can be a security risk.
                                    Hence we need a way to securely train an efficient model on the expense data. <br /> <br /> This is where <b>FedStation</b> comes in. We can securely train a model on the expense data and collect each individual models
                                     and aggregate them to a single model. This model can then be used to predict the expenses of users.
                                </div>
                            </div>
                        </div>
                        <span className='use-case-divider'></span>
                        <div className='use-cases-left'>
                            <div className='use-case-text'>
                                <div className='use-case-title'>
                                    Toxic Message Detection
                                </div>
                                <div className='use-case-description'>
                                    Chat messages are very personal to the user. We need to detect if the message is toxic or not without transfering the messages to a central repository for training. The model training should happen on the user's device.
                                    <br /> <br /> This is where <b>FedStation</b> comes in. We can securely train a model on the message data and collect each individual models and aggregate them to a single model. This model can then be used to predict the toxicity of messages.
                                </div>
                            </div>
                            <div className='use-case-logo'>
                                <img src={toxic} alt='logo' style={{"objectFit":"cover","width":"70%"}} />
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
