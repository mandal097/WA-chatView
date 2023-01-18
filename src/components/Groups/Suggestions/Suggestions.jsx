import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import GroupCard from '../GroupCard/GroupCard';
import styles from './Suggestions.module.scss';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading';
import { SearchOutlined } from '@ant-design/icons';

const Suggestions = () => {
    const [groups, setGroups] = useState([]);
    const [searchedGroup, setSearchedGroup] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true)
            const res = await axios.get(`/groups`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(res.data.data);
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                toast.error(res.data.message);
                setGroups(res.data.data)
            }
            setLoading(false)
            console.log(res.data.data);
        }
        fetchGroups()
    }, []);

    useEffect(() => {
        const search = groups?.filter((group) => {
            if (searchTerm === '') {
                return false;
            } else if (group?.groupName?.toLowerCase().includes(searchTerm?.toLowerCase())) {
                return group;
            }
            return false;
        })
        setSearchedGroup(search);
    }, [groups, searchTerm])

    return (
        <div className={styles.suggestions}>
            <ToastContainer className='toaster' />

            <div className={styles.groups_}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        {/* // ? <h3>Searched Groups</h3>
                        // : searchTerm && <h3>Not results found</h3> */}
                        {
                            !searchTerm
                                ?
                                <>
                                    <span>All Groups</span>
                                     <p>Groups that you can join</p>
                                </>
                                :
                                <>
                                    <span>Searched Groups</span>
                                </>
                        }
                        {searchedGroup.length > 0 && <p>Groups that you can join</p>}
                    </div>
                    <div className={styles.right} >
                        <div className={styles.search_box}>
                            <div className={styles.icon_}>
                                <SearchOutlined className={styles.icon} />
                            </div>
                            <input
                                type="text"
                                placeholder='Search group by name...'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.group_lists}>
                    {
                        loading && <Loading font='10rem' color='white' />
                    }


                    {
                        searchTerm ?

                            searchedGroup.map((group) => (
                                <div className={styles.card} key={group._id}>
                                    <GroupCard bg='var(--bgDark)' details={group} />
                                </div>
                            )) :
                            groups.map((group) => (
                                <div className={styles.card} key={group._id}>
                                    <GroupCard bg='var(--bgDark)' details={group} />
                                </div>
                            ))
                    }

                </div>
            </div>

        </div >
    )
}

export default Suggestions