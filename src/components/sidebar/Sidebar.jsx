import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./sidebar.css"
import {
    SettingsApplications,
    VpnKey,
    SettingsApplicationsOutlined

    
} from "@material-ui/icons";
import PersonIcon from '@material-ui/icons/Person';
import EqualizerIcon from '@material-ui/icons/Equalizer';


export default function Sidebar() {

    var navigate = useNavigate();
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Analytics</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem" onClick={
                            () => {
                                navigate("userAnalytics")
                            }
                        }>
                            <PersonIcon className = "sidebarIcon"/>
                            Users Analytics
                        </li>

                        <li className="sidebarListItem" onClick={
                            () => {
                                navigate("globalModelAnalytics")
                            }
                        }>
                            <EqualizerIcon className  = "sidebarIcon" />
                            Global Model Analytics
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Settings</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem" onClick={
                            () => { navigate("projectSettings") }
                        }><SettingsApplications className='sidebarIcon' />
                            Project Settings
                        </li>
                        <li className="sidebarListItem" onClick={
                            () => { navigate("keySettings") }
                        }><VpnKey className='sidebarIcon' />
                            Key Settings
                        </li><li className="sidebarListItem" onClick={
                            () => { navigate("modelSettings") }
                        }><SettingsApplicationsOutlined className='sidebarIcon' />
                            Model settings
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}
