import React from 'react'
import './UserAnalytics.css'

import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo' ; 
import {Userdata} from '../../assets/dummydata' ; 
import Chart from '../../components/chart/Chart'
export default function UserAnalytics() {
    return (
        <div  className='UserAnalytics'>
            <FeaturedInfo /> 
            <Chart data = {Userdata}  title = "User Analytics" grid dataKey="Active Users" />
        </div>
    )
}
