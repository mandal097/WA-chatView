import React, { useEffect, useState } from 'react';
import styles from './Edit.module.scss';
import { EditFilled } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Loading/Loading';
import { updateNameDesc } from '../../../../redux/currentGroup';


const EditNameDesc = () => {
    const { currentGroup } = useSelector(state => state.currentGroup)
    const [groupName, setGroupName] = useState(currentGroup?.groupName);
    const [desc, setDesc] = useState(currentGroup?.desc);
    const [disable, setDisable] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (groupName === '' || desc === '') {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [desc, groupName]);

    const update = async () => {
        if (desc === '') {
            toast.error('Please add description')
        }
        try {
            setLoading(true)
            const res = await axios.put(`/groups/update/${currentGroup?._id}`, {
                groupName: groupName,
                desc: desc
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                toast.error(res.data.message);
                setLoading(false);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                dispatch(updateNameDesc({
                    groupName: groupName,
                    desc: desc
                }))
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            toast.error('Something went wrong');
        }
    }

    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.edit_field} style={{ borderBottom: show && 'none' }}>
                <div>
                    <span>Name and description</span>
                </div>
                {!show && <button className={styles.icon_}
                    onClick={() => setShow(!show)}
                >
                    <EditFilled className={styles.icon} />
                </button>}
            </div>
            {show && <div className={styles.inputs}>
                <label htmlFor="">Group name:</label>
                <input
                    placeholder='new group name...'
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    type="text" />
                <label htmlFor="">Description:</label>
                <textarea
                    placeholder='description about group...'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    name="" id="" cols="30" rows="5"></textarea>
                <div className={styles.btns}>
                    <button onClick={() => setShow(!show)}>Cancel</button>
                    <button disabled={disable} className={`${disable && styles.disabled}`}
                        onClick={update}
                    >{loading ? <Loading font='3rem' color='white' /> : "Save"}
                    </button>
                </div>
            </div>}

        </>
    )
}

export default EditNameDesc