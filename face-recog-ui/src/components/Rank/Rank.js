import React from 'react';
import './Rank.css'

const Rank = ({name, entries}) => {
    return (
        <div className='rank-card center dib pa3 ma4 mt0 shadow-1 w-30'>
            <div className='f3'>
                {`${name}, your current entry count is...`}
                <div className='white f1'>
                    {entries}
                </div>
            </div>
        </div>
    )
}

export default Rank;