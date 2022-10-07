import React, { useEffect } from 'react';
import styles from './AddToGroup.module.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../../config/axios';
import { useState } from 'react';
import Members from './Members';
import { setMembers, removeMembers } from '../../../../redux/AddToGroup';
import GroupNameAvatar from './GroupNameAvatar';



const AddToGroup = ({ setShowGroupModal }) => {
    const { members } = useSelector((state) => state.group);
    const [friends, setFriends] = useState([]);
    const [showCreateGroup, setShowCreateGroup] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get('/user/get-all-users', {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setFriends(res.data.data);
        }
        fetch();
    }, []);

    const getValue = (id) => {
        dispatch(setMembers(id))
    };

    return (
        <div className={styles.add_to_group}>
            {
                !showCreateGroup &&
                <>
                    <div className={styles.heading}>
                        <div className={styles.wrapper_}>
                            <ArrowLeftOutlined className={styles.icon} onClick={() => {
                                setShowGroupModal(false)
                                dispatch(removeMembers())
                            }
                            } />
                            <span className={styles.add}> Add group participants</span>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.input}>
                            <input type="text" placeholder='search peoples' multiple />
                        </div>

                        <div className={styles.alluser}>


                            {friends.map(f => (
                                <div key={f._id} className={styles.user}
                                    onClick={() => getValue(f._id)}
                                >
                                    <div className={styles.img} >
                                        <img src={f.profilePic} alt="" />
                                    </div>
                                    <h6 className={styles.name}>{f.name}</h6>
                                </div>
                            ))}
                        </div>
                    </div>
                    {members.length !== 0 &&
                        <Members setShowCreateGroup={setShowCreateGroup} />
                    }
                </>
            }
            {
                showCreateGroup &&
                <GroupNameAvatar setShowCreateGroup={setShowCreateGroup} />
            }
        </div>
    )
}

export default AddToGroup