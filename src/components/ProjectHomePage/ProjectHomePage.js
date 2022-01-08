import React, { createContext, useEffect, useState } from 'react'
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from 'react-router-dom';

import './ProjectHomePage.css';


export const MonthlyAnalyticsContext = createContext();

export default function ProjectHomePage() {


    //retreiving Analytical data from Primary-Server 
    const [monthy_analytics, setMA] = useState([]);
    useEffect(() => {
        async function getMonthlyAnalytics() {
            // const data =
            //     await fetch("https://fedstation.herokuapp.com/monthlyUserCountAnalysis/projectZee")
            //         .then(resp => resp.json())
            //         .catch(err => console.log("Error occureed ", err));


            setMA([{ month: "January", userCount: 250, modelScore: 0.7, modelSize: 50 }, { month: "Febuary", userCount: 2500, modelScore: 0.7, modelSize: 50 }, { month: "March", userCount: 3500, modelScore: 0.7, modelSize: 50 }, { month: "April", userCount: 2900, modelScore: 0.7, modelSize: 50 }]);
        }
        getMonthlyAnalytics();
    }, []);


    return (
        <div className='ProjectHomePage'>

            <Sidebar className="ProjectSideBar" />
            <MonthlyAnalyticsContext.Provider value={monthy_analytics} >
                <Outlet />
            </MonthlyAnalyticsContext.Provider>

        </div>

    )
}
