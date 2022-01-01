import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./sidebar.css"
import {
    PermIdentity,
    Timeline,
    Equalizer,
    SettingsApplications,
    VpnKey,
    SettingsApplicationsOutlined
} from "@material-ui/icons";



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
                        }><PermIdentity className="sidebarIcon" />
                            users
                        </li>

                        <li className="sidebarListItem" onClick={
                            () => {
                                navigate("globalModelAnalytics")
                            }
                        }><Equalizer className="sidebarIcon" />
                            Global Model statistics
                        </li>

                        <li className="sidebarListItem" onClick={
                            () => {
                                navigate("localModelAnalytics")
                            }
                        }><Timeline className='sidebarIcon' />
                            Local Model Analytics
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
