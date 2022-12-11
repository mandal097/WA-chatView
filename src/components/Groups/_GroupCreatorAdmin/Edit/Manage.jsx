import React from 'react';
import styles from './Edit.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import UserBadge from '../../../UserBadge/UserBadge';

const Manage = ({ type, target, array }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const groupId = location.pathname.split('/')[2]

    return (
        <>
            <div className={styles.edit_field} style={{paddingBottom:'0'}}>
                <div>
                    <span>{type}</span>
                    <div style={{marginTop:'0.5rem',display:'flex',flexDirection:'row'}}>
                    <UserBadge array={array} size='2.3rem' show='false' mr='-0.7rem' />
                    </div>
                </div>
                <button 
                className={`${styles.manage_btn} ${styles.icon_}`}
                 onClick={() => {
                    navigate(`/groups/${groupId}/${target}`)
                }}>Manage</button>
            </div>
        </>
    )
}

export default Manage