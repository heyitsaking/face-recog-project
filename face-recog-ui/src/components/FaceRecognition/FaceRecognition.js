import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className={imageUrl.length ? 'center w-70 pa3 pt0' : 'dn'} style={{marginBottom: '15px'}}>
            <div className='absolute mb2'>
                <img id='inputImage' alt='result' src={imageUrl} width='500px' height='auto'/>
                {
                    boxes.map((box,i) => {
                        return <div key={i} className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition;