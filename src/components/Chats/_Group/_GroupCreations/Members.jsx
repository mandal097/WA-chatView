import React, { useState } from 'react';
import styles from './Members.module.scss';
import { CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { removeMembers, setMembers } from '../../../../redux/AddToGroup';
import { useEffect } from 'react';
import axios from '../../../../config/axios';
import { ArrowRightOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';


const Member = ({ m }) => {
  const dispatch = useDispatch();
  const [member, setMember] = useState({});

  const remove = (id) => {
    dispatch(setMembers(id))
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user/get-profile/${m}`, {
        headers: {
          token: `Bearer ${localStorage.getItem('token')}`
        }
      })
      // console.log(res.data.data);
      setMember(res.data.data);
    }
    fetchUser()
  }, [m])
  return (
    < div className={styles.elem} >
      <div className={styles.img}>
        <img src={member?.profilePic} alt="" />
      </div>
      <span className={styles.name}>{member?.name}</span>
      <div className={styles.close} onClick={() => remove(m)}><CloseOutlined className={styles.icon} />
      </div>
    </div>
  )
}


const Members = ({ setShowCreateGroup }) => {
  const { members } = useSelector(state => state.group);
  const dispatch = useDispatch();

  const nextStep = () => {
    if (members.length < 2) {
      toast.error('Select atleast two friends')
    } else {
      setShowCreateGroup(true);
    }
  }
  return (
    <div className={styles.selected_user}>
      <ToastContainer className='toaster' />
      <div className={styles.wrapper}>
        <div className={styles.cancel} onClick={() => {
          dispatch(removeMembers())
        }}><CloseOutlined className={styles.icon} /></div>
        {members.length !== 0 &&
          members.map((m) => (
            <Member key={m} m={m} />
          ))
        }
        <button className={styles.continue} onClick={nextStep}>
          <ArrowRightOutlined className={styles.ok} />
        </button>
      </div>
    </div>
  )
}

export default Members;