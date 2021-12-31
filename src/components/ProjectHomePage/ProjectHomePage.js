import React from 'react'
import Sidebar from "../sidebar/Sidebar";
import { Outlet, Route } from 'react-router-dom';

import './ProjectHomePage.css' ;

export default function ProjectHomePage() {
    return (
        <div  className='ProjectHomePage'>
            
            <Sidebar  className  = "ProjectSideBar" />
            <div className='outlet'>
                <Outlet />
            </div>
            
        </div>
        
    )
}
