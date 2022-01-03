import React from 'react'
import "./chart.css"
import { ComposedChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';

export default function Chart({ title, data, dataKey, grid }) {


    const usersLimit = 3000;
    const gradientOffset = () => {
        const dataMax = Math.max(...data.map((i) => i.ActiveUser));
        console.log(...data.map((i) => i.ActiveUser))
        console.log(usersLimit / dataMax)
        return 1 - (usersLimit / dataMax);
    };

    const off = gradientOffset();
    return (
        <div className='chart'>
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <ComposedChart data={data} syncId={1}>
                    <XAxis dataKey="name" stroke='#5550bd' />
                    <YAxis />
                    <Line type="monotype" dataKey="MaxUser" storke="#5550bd" strokeDasharray="5 5" dot={false} />
                    <defs>
                        <linearGradient id="splitColor" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset={off} stopColor="#D93125" stopOpacity="100%" />
                            <stop offset={off} stopColor="#00B7C7" stopOpacity="100%" />
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fill="url(#splitColor)" />
                    <Tooltip />
                    {grid}
                    <Legend />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}
