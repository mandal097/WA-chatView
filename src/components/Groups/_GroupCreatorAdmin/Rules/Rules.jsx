import { DeleteFilled, HolderOutlined } from '@ant-design/icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CreateRules from '../../../_Modals/CreateGroupRules/CreateRules';
import styles from './Rules.module.scss';
import axios from '../../../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import Loading from '../../../Loading/Loading';
import { groupActivityLogs } from '../../../../helpers/groupActivities';


const Card = ({ rules, index, col, adminAcess, show }) => {


    const deleteRule = async () => {

        try {
            const res = await axios.delete(`/groups/rules/${rules?._id}`, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                toast.error(res.data.message)
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                groupActivityLogs(rules?.groupId, `delete a rule.`)
            }
        } catch (error) {
            toast.error('Something went  wrong')
        }
    }


    return (
        <div className={styles.card}>
            <HolderOutlined className={styles.icon} style={{ color: 'var(--text)' }} />
            <span style={{ color: col }}>{index}</span>
            <div className={styles.rule}>
                <span style={{ color: col }}>{rules.title}</span>
                <p>{rules.desc}</p>
            </div>
            {adminAcess && show && <div className={styles.actions}>
                {/* <button onClick={() => {
                    setShow(true)
                }}><EditFilled className={styles.icon} /></button> */}
                <button onClick={deleteRule}><DeleteFilled className={styles.icon} /></button>
            </div>}

        </div>
    )
}

const Rules = ({ width, col }) => {
    const { currentGroup } = useSelector(state => state.currentGroup);
    const { currentUser } = useSelector(state => state.user);
    const [show, setShow] = useState(false);
    const [ruleList, setRuleList] = useState([])
    const location = useLocation();
    const path = location.pathname.split('/')[3];
    const [adminAcess, setAdminAccess] = useState(true)
    const [loading, setLoading] = useState(false);
    const obj = {
        title: 'Set up your rules',
        desc: "To increase your s great, but may also be sensitive and private. What's shared in the group should stay in the group."
    }

    useEffect(() => {
        const check = currentGroup?.admins.includes(String(currentUser?._id))
        if (path === 'about' && !check) {
            setAdminAccess(false)
        }
    }, [path, currentUser, currentGroup])

    useEffect(() => {
        const fetchRules = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/groups/rules/${currentGroup?._id}`, {
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
                    setRuleList(res.data.data)
                }
                // console.log(res.data.data);
                setLoading(false)
            } catch (error) {
                toast.error('Something went wrong')
            }
        }
        fetchRules()
    }, [currentGroup]);



    if (!adminAcess && ruleList.length === 0) return;
    return (
        <div className={styles.rules} >
            <ToastContainer className='toaster' />
            <div className={styles.wrapper} style={{ width: width }}>
                <div className={styles.top} style={{
                    borderBottomRightRadius: !adminAcess && 0,
                    borderBottomLeftRadius: !adminAcess && 0,
                }}>
                    <h2>Group rules {!adminAcess && "from the admins"}</h2>
                    {adminAcess &&
                        <button onClick={() => {
                            setShow(true)
                        }}>Create</button>
                    }
                </div>
                <div className={styles.rule_list}
                    style={{
                        marginTop: !adminAcess && 0,
                        borderTopRightRadius: !adminAcess && 0,
                        borderTopLeftRadius: !adminAcess && 0,
                    }}>
                    {loading ? <Loading font='10rem' color='white' />

                        : <>
                            {
                                ruleList?.length > 0 &&
                                ruleList.map((rules, index) => (
                                    <>
                                        <Card
                                            key={index}
                                            rules={rules}
                                            index={index + 1}
                                            show={true}
                                            setShow={setShow}
                                            col={col} //for color
                                            adminAcess={adminAcess} />
                                    </>
                                ))
                            }
                            {
                                ruleList.length === 0 && adminAcess &&
                                <Card
                                    rules={obj}
                                    show={false}
                                    col={col} //for color
                                    adminAcess={adminAcess} />
                            }
                        </>}
                </div>
            </div>
            {show && <CreateRules
                setShow={setShow}
                ruleList={ruleList} />}
        </div>
    )
}

export default Rules