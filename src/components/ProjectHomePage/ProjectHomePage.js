import React, { createContext, useEffect, useState } from 'react'
import Sidebar from "../sidebar/Sidebar";
import { Outlet, useParams } from 'react-router-dom';
import { getProjectDetails } from "../../ApiCalls"

import './ProjectHomePage.css';


export const MonthlyAnalyticsContext = createContext();

export default function ProjectHomePage() {


    //retreiving Analytical data from Primary-Server 
    const [monthy_analytics, setMA] = useState([]);

    const [projectDetails, setPD] = useState({});

    const params = useParams();

    useEffect(() => {
        console.log(params.id)

        async function getMonthlyAnalytics() {
            // const data =
            //     await fetch("https://fedstation.herokuapp.com/monthlyUserCountAnalysis/projectZee")
            //         .then(resp => resp.json())
            //         .catch(err => console.log("Error occureed ", err));


            setMA([{ month: "January", userCount: 250, modelScore: 0.7, modelSize: 50 }, { month: "Febuary", userCount: 2500, modelScore: 0.7, modelSize: 50 }, { month: "March", userCount: 3500, modelScore: 0.7, modelSize: 50 }, { month: "April", userCount: 2900, modelScore: 0.7, modelSize: 50 }]);
        }
        getMonthlyAnalytics();

        getProjectDetails(params.id)
            .then(resp => {
                setPD(resp.data)
                console.log(resp)
            })
            .catch(err => console.log(err))


    }, []);


    return (
        <div className='ProjectHomePage'>

            <Sidebar className="ProjectSideBar" project={projectDetails} />
            <MonthlyAnalyticsContext.Provider value={monthy_analytics} >
                <Outlet />
            </MonthlyAnalyticsContext.Provider>

        </div>

    )
}
