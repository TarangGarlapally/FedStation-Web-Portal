import React from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import {Userdata} from "../../assets/dummydata"
import Sidebar from "../sidebar/Sidebar";
import "./ProjectHomePage.css"

export default function ProjectHomePage() {
    return (
        <div className='HomePage'>
            <div className='projectsidebar'>
                <Sidebar/>
            </div>
            
            <div className='home'>
                <FeaturedInfo/>
                <Chart data={Userdata} title="Global Model Statystics" grid dataKey="Active User"/>
            </div>
            
        </div>
        
    )
}
