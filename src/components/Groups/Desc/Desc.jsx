import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Desc.module.scss';

const Desc = () => {
    const { currentGroup } = useSelector(state => state.currentGroup)
    const [showDesc, setShowDesc] = useState(false);
    // console.log(currentGroup);
    return (
        <>
            <div className={styles.desc}>
                <p className={`${!showDesc && styles.desc_p}`}>{currentGroup?.desc}</p>

            </div>
            {
                !showDesc &&
                <div onClick={() => setShowDesc(!showDesc)} className={styles.more_less}>See{showDesc ? ' less...' : ' more...'}</div>
            }
            {
                showDesc &&
                <div onClick={() => setShowDesc(!showDesc)} className={styles.more_less}>See{showDesc ? ' less...' : ' more...'}</div>
            }
        </>
    )
}

export default Desc