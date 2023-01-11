import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import styles from './ActivityLog.module.scss';
import axios from '../../../../config/axios';
import Loading from '../../../Loading/Loading';
import AddNoteModal from '../../../_Modals/AddGroupActivityNote/AddNoteModal';

const ActivityCard = ({ actions }) => {
    // console.log(actions);
    const [show, setShow] = useState(false);
    const [notes, setNotes] = useState(actions?.note)

    return (
        <>
            <div className={styles.card}>
                <div className={styles.img}>
                    <img src={actions?.adminId?.profilePic} alt="" />
                </div>
                <div className={styles.details}>
                    <h2><span>{actions?.adminId?.name} </span>{actions?.title}</h2>
                    <small>{actions?.createdAt.slice(0, 10)}, {actions?.createdAt.slice(11, 16)}</small>
                    {notes && <div className={styles.note}>
                        <i>{notes}</i>
                    </div>}
                </div>
                <button onClick={() => setShow(true)}>{notes ? 'Edit ' : 'Add '}note</button>
            </div>

            {
                show && <AddNoteModal
                    actionId={actions._id}
                    groupId={actions.groupId}
                    setNotes={setNotes}
                    setShow={setShow}
                />
            }
        </>
    )
}


const ActivityLog = () => {
    const { currentGroup } = useSelector(state => state.currentGroup);
    const [activityList, setAcitivityList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRules = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/groups/activities/${currentGroup?._id}`, {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.status === 'err') {
                    setLoading(false)
                    toast.error(res.data.message);
                }
                if (res.data.status === 'success') {
                    setLoading(false)
                    setAcitivityList(res.data.data)
                }
                setLoading(false)
            } catch (error) {
                toast.error('Something went wrong')
            }
        }
        fetchRules()
    }, [currentGroup]);

    // console.log(activityList);
    return (
        <div className={styles.activity_log}>
            <ToastContainer className='toaster' />
            <div className={styles.top}>
                <h1>Activity log</h1>
                {/* <div className={styles.btns}></div> */}
            </div>
            <div className={styles.bottom}>
                {loading ? <Loading font='10rem' color='white' />
                    : <>
                        {
                            activityList?.map((actions) => (
                                <ActivityCard key={actions._id} actions={actions} />
                            ))
                        }
                    </>
                }
                {
                    activityList?.length === 0 && <h1 style={{ fontSize: '2.3rem', color: 'var(--error)', fontWeight: '200' }}>No activities taken in this group</h1>
                }
            </div>
        </div>
    )
}

export default ActivityLog