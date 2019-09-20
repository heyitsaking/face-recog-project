import React from 'react';
import './Rank.css'


const Rank = () => {
    return (
        <div className='rank-card center dib pa3 ma4 mt0 shadow-3 w-30'>
            <div className='f3'>
                {'Arturo, your current rank is...'}
            </div>
            <div className='white f1'>
                {'#5'}
            </div>
        </div>
    )
}

export default Rank;