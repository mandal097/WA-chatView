import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Groups/Sidebar/Sidebar';
import SidebarAdmin from '../../components/Groups/_GroupCreatorAdmin/SideBarAdmin/SidebarAdmin';
import styles from './Groups.module.scss'

const Groups = () => {
    const { currentGroup } = useSelector(state => state.currentGroup);
    const { currentUser } = useSelector(state => state.user);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const path = location.pathname.split('/')[2];


    useEffect(() => {
        const check = currentGroup?.admins.includes(String(currentUser?._id))
        setIsAdmin(check);

    }, [currentGroup, currentUser]);
    
    return (
        <div className={styles.groups}>
            <div>
                {
                    isAdmin && path === String(currentGroup?._id) && <SidebarAdmin />
                }
                {
                    path === 'feed' && <Sidebar />
                }
                {
                    path === 'discover' && <Sidebar />
                }
                {
                    path === 'search' && <Sidebar />
                }
                {
                    !isAdmin && path === String(currentGroup?._id) && <Sidebar />
                }
            </div>
            <div className={styles.body}>
                <Outlet />
            </div>
        </div>
    )
}

export default Groups