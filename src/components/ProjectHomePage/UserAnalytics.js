import React  , {useContext} from 'react'
import './UserAnalytics.css'

import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo' ; 
import Chart from '../../components/chart/Chart'; 
import ExtraUsersChart from '../chart/ExtraUsersChart';
import {MonthlyAnalyticsContext} from './ProjectHomePage' ; 

/*
collect data from database using 
useEffect Hook 

*/
export default function UserAnalytics() {

    const monthly_analytics   = useContext(MonthlyAnalyticsContext) ; 

    console.log(monthly_analytics , "in User Analytics") ; 

    var AvgAC  = 0 ; 
    function getUserData(){
        var userData  = (monthly_analytics.map(i => {
            AvgAC += i.userCount ; 
            return {
                "month" : i.month  , 
                "ActiveUser" : i.userCount,
                "MaxUser" : 3000 ,
            }
            
        })); 

        if(monthly_analytics.length != 0)
        AvgAC /= monthly_analytics.length ; 

        return userData ; 
    }
    const currentMonthAC  = (monthly_analytics.length >=1 ? monthly_analytics[monthly_analytics.length-1].userCount : 0) ; 
    const lastMonthAC  =  (monthly_analytics.length >=2 ? (monthly_analytics[monthly_analytics.length-2].userCount): 0 ) ; 
    
    const UserMontlyData  = getUserData() ; 
    

    const FeatureData  = [
        {
            "title" : "Current Active Users",
            "Value" : currentMonthAC , 
            "Percentage" : Math.round(((currentMonthAC - lastMonthAC)/lastMonthAC )*100)  ,   
        },
        {
            "title" : "Average Active Users",
            "Value" : AvgAC , 
            "Percentage" : null ,   
        },{
            "title" : "Current Active Users",
            "Value" : currentMonthAC , 
            "Percentage" : Math.round(((currentMonthAC - lastMonthAC)/lastMonthAC )*100)  ,   
        }
    ]
    return (
        <div  className='UserAnalytics'>
            <h1 className='Usertitle'>User Analytics</h1>
            <FeaturedInfo 
                FeatureData  = {FeatureData}
            /> 

            <div className='UserCountCharts'>
                <Chart data = {UserMontlyData}  title = "User Analytics (Monthly)" grid dataKey="ActiveUser" />
                <ExtraUsersChart data  = {UserMontlyData} title  = "Extra Users (Monthly)" grid  dataKey= "ActiveUser" />
            </div>
            
        </div>
    )
}
