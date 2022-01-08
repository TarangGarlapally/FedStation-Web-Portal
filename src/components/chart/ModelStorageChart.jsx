import React from 'react'
import "./chart.css"
import { ComposedChart, XAxis,YAxis, Tooltip, Legend, ResponsiveContainer , Bar } from 'recharts';

export default function ModelStorageChart  ({title, model_size , data,dataKey,grid}) {
      

    return (
        <div className='storageChart'>

            <div style={{
                width : "100%"
            }}>
                <h3 className="chartTitle">{title}</h3>
                <ResponsiveContainer width="100%" height="100%"  aspect={4 / 2}>
                    <ComposedChart data={data} syncId={2}>
                        <XAxis dataKey="month" stroke='#5550bd'/>
                        <YAxis />
                        <Bar type="monotype" dataKey= {dataKey} fill="#4289E7" />
                        <Tooltip/>
                        <Legend/>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div  className= "infoBlock">
                <p style={{
                    fontSize : "1.3em" , 
                    margin : "0em"
                }}>Current Storage</p>
                <h1>{model_size}  MB</h1>
                <p className='percent'>+30.9%</p>
            </div>
            
            
        </div>
    )
}
