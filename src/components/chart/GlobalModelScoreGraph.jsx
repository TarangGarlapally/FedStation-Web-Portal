import React from 'react'
import "./chart.css"
import { ComposedChart, Line, XAxis,YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer  } from 'recharts';

export default function GlobalModelScoreGraph   ({title,data,dataKey,grid}) {
      

    return (
        <div className='chart'>
            <div>
                <h3 className="chartTitle">{title}</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <ComposedChart data={data} >
                        <XAxis dataKey="month" stroke='#5550bd'/>
                        <YAxis />
                        <Line type="monotone" dataKey= {dataKey} storke="#4289E7"  strokeWidth={2}/>
                        <Tooltip/>
                        {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5"/>}
                        <Legend/>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <div className='infoBlock' style = {{
                display : 'flex', 
                justifyContent : "space-evenly"
            }}>
                <div>
                    <p>Current Score</p>
                    <div  style  = {{ 
                        display : "inline-block"
                    }}><h1 style = {{
                        margin : "0em"
                    }}>2.34</h1><p>+24.3%</p></div>
                </div>

                
                <div>
                    <p>Average Score</p>
                    <div  style  = {{ 
                        display : "inline-block"
                    }}><h1 style = {{
                        margin : "0em"
                    }}>1.34</h1><p>+13.3%</p></div>
                </div>
                <div>
                    <p>Best Score</p>
                    <div  style  = {{ 
                        display : "inline-block"
                    }}><h1 style = {{
                        margin : "0em"
                    }}>3.04</h1><p>+33.3%</p></div>
                </div>
            </div>
        </div>
    )
}
