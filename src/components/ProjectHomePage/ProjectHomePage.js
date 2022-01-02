import React, { createContext, useEffect  , useState} from 'react'
import Sidebar from "../sidebar/Sidebar";
import { Outlet} from 'react-router-dom';

import './ProjectHomePage.css' ;


export const MonthlyAnalyticsContext  = createContext() ; 

export default function ProjectHomePage() {


    //retreiving Analytical data from Primary-Server 
    const [monthy_analytics , setMA ] = useState([]) ; 
    useEffect(()=>{
        async function getMonthlyAnalytics(){
            const data  = 
                        await fetch("http://localhost:8080/monthlyUserCountAnalysis/projectZee")
                        .then(resp => resp.json())
                        .catch(err => console.log("Error occureed " , err)) ; 

            
            setMA(data) ;
        }
        getMonthlyAnalytics();
    } , [] ); 

    
    return (
        <div  className='ProjectHomePage'>
            
            <Sidebar  className  = "ProjectSideBar" />
            <MonthlyAnalyticsContext.Provider value={monthy_analytics} >
                <Outlet />
            </MonthlyAnalyticsContext.Provider>
            
        </div>
    )
}
