import React from 'react';
import ReactImageMagnify from 'react-image-magnify';

import imgg from '../../../assets/images/test.webp'

const MagnifyImage = () => {
    console.log(imgg);
    return (
        <div style={{ width: '300px', height: '400px' }}>
            <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: false,
                    src: imgg
                },
                largeImage: {
                    src: imgg,
                    width: 232,
                    height: 133
                }
            }} />
        </div>
    )
}

export default MagnifyImage