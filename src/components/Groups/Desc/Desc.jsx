import React, { useState } from 'react';
import styles from './Desc.module.scss';

const Desc = () => {
    const [showDesc, setShowDesc] = useState(false);
    return (
        <>
            {
                !showDesc &&
                <div onClick={() => setShowDesc(!showDesc)} className={styles.more_less}>See{showDesc ? ' less...' : ' more...'}</div>
            }
            {
                showDesc &&
                <div className={styles.desc}>
                    <p>- I am ready to DO stuff whenever whatever is required</p>
                    <p>- I am ALWAYS READY to take Massive Action</p>
                    <p>- Words like "Mediocre" or "Average" don't exist in my dictionary</p>
                    <p>- I am fond of "No Rules" except getting things DONE</p>
                    <p>- I believe in IMPERFECT Action</p>
                    <p>- I am not fond of watching the "clock"... my "Vision" is my Oxygen</p>
                    <p>- I am the POWER myself & I consistently look to IMPROVE myself</p>
                    <p>- I am the one who IMPACTS the world</p>
                    <p>- I AM A DOER!!</p>
                </div>
            }
            {
                showDesc &&
                <div onClick={() => setShowDesc(!showDesc)} className={styles.more_less}>See{showDesc ? ' less...' : ' more...'}</div>
            }
        </>
    )
}

export default Desc