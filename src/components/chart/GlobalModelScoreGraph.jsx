import React from 'react'
import "./chart.css"
import { ComposedChart, Line, XAxis,YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer  } from 'recharts';

export default function GlobalModelScoreGraph   ({title,model_score , data,dataKey,grid}) {
      

    return (
        <div className='chart'>
            <div>
                <h3 className="chartTitle">{title}</h3>
                <ResponsiveContainer width="100%" aspect={4 / 1}>
                    <ComposedChart data={data} syncId={2}>
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
                    }}>{(model_score.curr/100).toFixed(2)}</h1><p>+24.3%</p></div>
                </div>

                
                <div>
                    <p>Average Score</p>
                    <div  style  = {{ 
                        display : "inline-block"
                    }}><h1 style = {{
                        margin : "0em"
                    }}>{(Math.round(model_score.avg)/100).toFixed(2)}</h1><p>+13.3%</p></div>
                </div>
                <div>
                    <p>Best Score</p>
                    <div  style  = {{ 
                        display : "inline-block"
                    }}><h1 style = {{
                        margin : "0em"
                    }}>{(model_score.max / 100).toFixed(2)}</h1><p>+33.3%</p></div>
                </div>
            </div>
        </div>
    )
}
