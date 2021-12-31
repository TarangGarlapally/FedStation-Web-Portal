import React from 'react'
import "./featuredInfo.css"

export default function FeaturedInfo() {
    return (
        <div className='featured'>
            <div className='featuredItem'>
                <span className="featuredTitle"> <i class="fas fa-angle-up"></i> <strong>Current Active Users</strong></span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">
                        2548
                    </span>
                </div>
            </div>
            <div className='featuredItem'>
                <span className="featuredTitle"> <strong>Current Active Users</strong></span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">
                        2548
                    </span>
                </div>
            </div>
            <div className='featuredItem'>
                <span className="featuredTitle"> <strong>Current Active Users</strong></span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">
                        2548
                    </span>
                </div>
            </div>
        </div>
    )
}
