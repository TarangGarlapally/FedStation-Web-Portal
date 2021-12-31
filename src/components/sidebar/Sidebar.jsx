import React  from 'react'
import { useNavigate } from 'react-router-dom'
import "./sidebar.css"


export default function Sidebar() {

    var navigate  = useNavigate() ; 
    return (
        <div className='sidebar'> 
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Analytics</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem" onClick={
                            ()=>{
                                navigate("userAnalytics")
                            }
                        }>
                            users
                        </li>
                        <li className="sidebarListItem" onClick={
                            ()=>{
                                navigate("globalModelAnalytics")
                            }
                        }>
                            Global Model statistics 
                        </li><li className="sidebarListItem" onClick={
                            ()=>{
                                navigate("localModelAnalytics")
                            }
                        }>
                            Local Model Analytics
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                <h3 className="sidebarTitle">Settings</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            Project Settings
                        </li>
                        <li className="sidebarListItem">
                            Key Settings
                        </li><li className="sidebarListItem">
                            Model settings
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}
