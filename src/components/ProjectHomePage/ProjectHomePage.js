import React from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import { Userdata } from "../../assets/dummydata"
import Sidebar from "../sidebar/Sidebar";

export default function ProjectHomePage() {
    return (
        <div className='home'>

            <Sidebar />
            <FeaturedInfo />
            <Chart data={Userdata} title="Global Model Statystics" grid dataKey="Active User" />
        </div>
    )
}
