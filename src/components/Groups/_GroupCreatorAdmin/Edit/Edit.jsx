import React from 'react';
import styles from './Edit.module.scss';
import Manage from './Manage';
import EditNameDesc from './EditNameDesc';
import EditPrivacy from './EditPrivacy';
import EditVisibility from './EditVisibility';
import LocationSelector from './LocationSelector';
import { useSelector } from 'react-redux';

const Edit = () => {
    const { currentGroup } = useSelector(state => state.currentGroup);
    console.log(currentGroup);
    return (
        <div className={styles.edit}>
            <div className={styles.wrapper}>
                <div className={styles.section}>
                    <h1>Set up group</h1>
                    <EditNameDesc />
                    <EditPrivacy />
                    <EditVisibility />
                    <LocationSelector />
                    <Manage type='Manage admins' target='overview' array={currentGroup?.admins}/>
                    <Manage type='Manage members' target='member-requests' array={currentGroup?.members}/>
                </div>
            </div>
        </div>
    )
}

export default Edit