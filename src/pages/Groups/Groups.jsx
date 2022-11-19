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
    const activeState = location.pathname.split('/')[3];
    const [showActions, setShowActions] = useState(false)

    useEffect(() => {
        const check = currentGroup?.admins.includes(String(currentUser?._id))
        setIsAdmin(check);

    }, [currentGroup, currentUser]);

    useEffect(() => {
        const check = currentGroup?.admins.includes(String(currentUser?._id))
        if (check && activeState !== undefined) {
            setShowActions(true);
        }
        const routes = [undefined, 'about', 'featured', 'videos', 'members', 'media', 'files']
        const dblCheck = routes.includes(activeState)
        if (dblCheck) {
            setShowActions(false);
        }
    }, [currentGroup, currentUser, activeState]);

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
            <div className={styles.body} style={{ padding: showActions && 0 }}>
                <Outlet />
            </div>
        </div>
    )
}

export default Groups