import React from 'react'
import './UserAnalytics.css'

import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo' ; 
import {Userdata} from '../../assets/dummydata' ; 
import Chart from '../../components/chart/Chart'; 
import ExtraUsersChart from '../chart/ExtraUsersChart';


/*
collect data from database using 
useEffect Hook 

*/
export default function UserAnalytics() {
    return (
        <div  className='UserAnalytics'>
            <h1 className='Usertitle'>User Analytics</h1>
            <FeaturedInfo /> 

            <div className='UserCountCharts'>
                <Chart data = {Userdata}  title = "User Analytics (Monthly)" grid dataKey="ActiveUser" />
                <ExtraUsersChart data  = {Userdata} title  = "Extra Users (Monthly)" grid  dataKey= "ActiveUser" />
            </div>
            
        </div>
    )
}
