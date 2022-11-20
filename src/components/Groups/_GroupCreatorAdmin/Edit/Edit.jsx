import React from 'react';
import styles from './Edit.module.scss';
import EditNameDesc from './EditNameDesc';
import EditPrivacy from './EditPrivacy';
import EditVisibility from './EditVisibility';
import LocationSelector from './LocationSelector';

const Edit = () => {


    return (
        <div className={styles.edit}>
            <div className={styles.wrapper}>
                <div className={styles.section}>
                    <h1>Set up group</h1>
                    <EditNameDesc />
                    <EditPrivacy />
                    <EditVisibility />
                    <LocationSelector />

                </div>
            </div>
        </div>
    )
}

export default Edit