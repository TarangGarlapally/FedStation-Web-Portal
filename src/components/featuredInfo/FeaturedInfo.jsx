import React from 'react'
import "./featuredInfo.css"

export default function FeaturedInfo(props) {


    return (
        <div className='featured'>

            {
                props.FeatureData.map((e,index) => {
                    return (
                        <div className='featuredItem' key={index}>
                            <span className="featuredTitle"> <i className="fas fa-angle-up"></i> <strong>{e.title}</strong></span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">
                                    {(e.Value)} &nbsp;
                                    {e.Percentage ? <p style={{
                                        color: e.Percentage >= 0 ? "green" : "red",
                                        fontWeight: "bold"
                                    }}>({e.Percentage})</p> : null}

                                </span>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}
