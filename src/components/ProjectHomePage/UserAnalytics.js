import React  , {useContext} from 'react'
import './UserAnalytics.css'
import { useParams } from 'react-router-dom';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo' ; 
import Chart from '../../components/chart/Chart'; 
import ExtraUsersChart from '../chart/ExtraUsersChart';
import {MonthlyAnalyticsContext} from './ProjectHomePage' ; 
import {useState,useEffect} from 'react'

/*
collect data from database using 
useEffect Hook 

*/
export default function UserAnalytics() {

    const[currentAU,setCurrentAU]=useState({})
    const[averageAU,setAverageAU]=useState({})
    const[monthlyAU,setMonthlyAU]=useState([])
    const[extraAU,setExtraAU]=useState([])
    const[maxAU,setMaxAU]=useState()
    const monthly_analytics   = useContext(MonthlyAnalyticsContext) ; 
    const params = useParams();
    console.log(monthly_analytics , "in User Analytics") ; 

    var AvgAC  = 0 ; 
    
    useEffect(()=>{
        async function getUserAnalytics(){
            await fetch("http://fedstation.herokuapp.com/userAnalytics/"+params.id)
            .then(res=>res.json())
            .then((data)=>{
                setCurrentAU(data.currentActiveUsers)
                setAverageAU(data.averageActiveUsers)
                setMonthlyAU(data.monthlyActiveUsers)
                setExtraAU(data.extraActiveUsers)
                setMaxAU(data.maxActiveUsers)
            })
        }
        getUserAnalytics()
    },[]);
    //console.log(monthlyAU)
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
    
    const UserMontlyData1  = getUserData() ; 
    

    const FeatureData  = [
        {
            "title" : "Current Active Users",
            // "Value" : currentMonthAC , 
            // "Percentage" : Math.round(((currentMonthAC - lastMonthAC)/lastMonthAC )*100)  ,   
            "Value":currentAU.value,
            "Percentage":currentAU.change
        },
        {
            "title" : "Average Active Users",
            // "Value" : AvgAC , 
            // "Percentage" : null ,   
            "Value" : averageAU.value , 
            "Percentage" : averageAU.change ,   
        }
    ]
    const userMonthlyData=[
        {
            "month":monthlyAU.month,
            "ActiveUser":monthlyAU.value,
            
        }
    ]
    const extraMonthlyData=[{
        "month":extraAU.month,
        //"ActiveUser":extraAU.value,
        "maxUser":maxAU
    }]

    return (
        <div  className='UserAnalytics'>
            <h1 className='Usertitle'>User Analytics</h1>
            <FeaturedInfo 
                FeatureData  = {FeatureData}
            /> 

            <div className='UserCountCharts'>
                <Chart data = {userMonthlyData}  title = "User Analytics (Monthly)" grid dataKey="ActiveUser" />
                <ExtraUsersChart data  = {extraMonthlyData} title  = "Extra Users (Monthly)" grid  dataKey= "ActiveUser" />
            </div>
            
        </div>
    )
}
