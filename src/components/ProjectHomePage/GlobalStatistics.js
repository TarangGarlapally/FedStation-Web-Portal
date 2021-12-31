import React from 'react'
import "./globalStatistics.css"
import {Userdata} from '../../assets/dummydata' ; 
import Chart from '../../components/chart/Chart'

export default function GlobalStatistics() {
    return (
        <div className='globalStatistics'>
            <Chart data = {Userdata}  title = "User Analytics" grid dataKey="Active User" />
        </div>
    )
}
