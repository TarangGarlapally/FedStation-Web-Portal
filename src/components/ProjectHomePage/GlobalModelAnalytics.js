import React from 'react'
import './ModelAnalytics.css'

import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo' ; 
import {ModelScoredata } from '../../assets/dummydata' ; 
import Chart from '../../components/chart/GlobalModelScoreGraph'; 
import GlobalModelScoreGraph from '../../components/chart/GlobalModelScoreGraph';
import ModelStorageChart from '../chart/ModelStorageChart';



/*
collect data from database using 
useEffect Hook 

*/
export default function GlobalModelAnalytics() {
    return (
        <div  className='GlobalModelAnalytics'>
            <h1  className='GlobalModeltitle'>Global Model Analytics </h1>
            <FeaturedInfo /> 

            <div className='ScoreCharts'>
                <GlobalModelScoreGraph title  = "Score Graph (Monthly)"  data  = {ModelScoredata} dataKey  = "score" grid  />
                <ModelStorageChart title  = "Model Storage (Monthly)" data = {ModelScoredata}  dataKey  = "score" />
            </div>

            <div className='shadow' style = {{
                padding : "2em", 
                margin : "1em", 
                borderRadius : "1em"
            }}>
                <h1 className='GlobalModeltitle'>OVERALL PERFORMANCE <h3 style={{color : "green"}}>(63.54%)</h3> </h1>
                <hr/>

                
            </div>
            
        </div>
    )
}
