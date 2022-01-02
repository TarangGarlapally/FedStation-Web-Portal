import React from 'react'
import "./chart.css"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart({title,data,dataKey,grid}) {
    return (
        <div className='chart'>
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={12 / 3}>
                <LineChart data={data}>
                    <XAxis height  = {20} dataKey="month" stroke='#5550bd'/>
                    <Line type="monotype" dataKey={dataKey} storke="#5550bd"/>
                    <Line type = "monotone" dataKey ={dataKey} activeDot={{ r: 8 }} />
                    <Tooltip/>
                    {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5"/>}
                    <Legend/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
