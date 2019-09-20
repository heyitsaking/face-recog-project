import React from 'react';
import './Rank.css'

const Rank = ({name, entries}) => {
    return (
        <div className='rank-card center dib pa3 ma4 mt0 shadow-3 w-30'>
            <div className='f3'>
                {`${name}, your current rank is...`}
                <div className='white f1'>
                    {entries}
                </div>
            </div>
        </div>
    )
}

export default Rank;