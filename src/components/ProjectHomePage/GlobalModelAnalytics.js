import React  ,{useContext}  from 'react'
import './ModelAnalytics.css'

import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo' ; 
import {ModelScoredata } from '../../assets/dummydata' ; 
import GlobalModelScoreGraph from '../../components/chart/GlobalModelScoreGraph';
import ModelStorageChart from '../chart/ModelStorageChart';
import {MonthlyAnalyticsContext} from './ProjectHomePage' ; 


/*
collect data from database using 
useEffect Hook 

*/
export default function GlobalModelAnalytics() {

    const monthly_analytics   = useContext(MonthlyAnalyticsContext) ; 

    console.log(monthly_analytics , "in User Analytics") ; 

    var model_score  = {
        avg : 0 , 
        max : 0 , 
        curr : 0 
    }; 

    var model_size  = 0 ; 


    function getModelData(){
        var modelData  = (monthly_analytics.map(i => {
            model_score.avg += i.modelScore ; 
            model_score.max   = Math.max(model_score.max , i.modelScore); 

            return {
                "month" : i.month  , 
                "score" : i.modelScore,
                "size" : i.modelSize ,
            }
            
        })); 



        
        if(monthly_analytics.length != 0){
            model_score.avg /= monthly_analytics.length ;
            model_score.curr = monthly_analytics.at(-1).modelScore ;
            model_size  = monthly_analytics.at(-1).modelSize ;
        }
         

        return modelData ; 
    }

    const ModelMontlyData  = getModelData() ; 
    return (
        <div  className='GlobalModelAnalytics'>
            <h1  className='GlobalModeltitle'>Global Model Analytics </h1> 

            <div className='ScoreCharts'>
                <GlobalModelScoreGraph title  = "Score Graph (Monthly)" model_score  = {model_score} data  = {ModelMontlyData} dataKey  = "score" grid  />
                <ModelStorageChart title  = "Model Storage (Monthly)" model_size  = {model_size} data = {ModelMontlyData}  dataKey  = "score" />
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
