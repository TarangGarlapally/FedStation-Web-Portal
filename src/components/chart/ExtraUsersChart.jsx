import React from 'react'
import "./chart.css"
import { ComposedChart, Line, XAxis,YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer , Area } from 'recharts';

export default function ExtraUsersChart({title,data,dataKey,grid}) {
      

    function getExtraUsers(){
        var arr  = [  ...data.map((i) =>{
            return {
                "name" : i.name , 
                "extra" : i.ActiveUser - i.MaxUser 
            } 

        } ) ] ; 
        return arr ;  
        
        
    }
    var extraUsers  = getExtraUsers() ; 
    return (
        <div className='chart'>
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <ComposedChart data={extraUsers} >
                    <XAxis dataKey="name" stroke='#5550bd'/>
                    <YAxis />
                    <Line type="monotype" dataKey= "extra" storke="#5550bd" />
                    <defs>
                        <linearGradient id="splitColor" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset={0.25} stopColor="#D93125" stopOpacity="100%"  />
                        <stop offset={0.25} stopColor="#00B7C7" stopOpacity= "100%" />
                        </linearGradient>
                    </defs>
                    <Tooltip/>
                    {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5"/>}
                    <Legend/>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}
