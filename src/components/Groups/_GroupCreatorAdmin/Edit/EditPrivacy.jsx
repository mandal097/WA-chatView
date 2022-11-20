import React, { useEffect, useState } from 'react';
import styles from './Edit.module.scss';
import { CaretDownFilled, CaretUpFilled, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../../../config/axios';
import { updatePrivacy } from '../../../../redux/currentGroup';
import Loading from '../../../Loading/Loading';



const EditPrivacy = () => {
    const { currentGroup } = useSelector(state => state.currentGroup)
    const [selected, setSelected] = useState(currentGroup?.isPrivate)
    const [show, setShow] = useState(false);
    const [disable, setDisable] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selected === currentGroup?.isPrivate) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [currentGroup, selected]);

    const update = async () => {
        if (selected === currentGroup?.isPrivate) {
            toast.error('Already exists')
        }
        try {
            setLoading(true)
            const res = await axios.put(`/groups/update/${currentGroup?._id}`, {
                isPrivate: selected
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
                dispatch(updatePrivacy(selected))
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
                    <span>Privacy</span>
                    <small>{selected}</small>
                </div>
                <button className={styles.icon_} onClick={() => setShow(!show)}>
                    {
                        show
                            ? <CaretUpFilled className={styles.icon} />
                            : <CaretDownFilled className={styles.icon} />
                    }
                </button>
            </div>
            {show && <div className={styles.radios}>

                <div className={`${styles.radio} ${selected === 'public' && styles.radio_active}`} onClick={() => setSelected('public')}
                >
                    <div className={styles.icon_}>
                        <EyeFilled className={styles.icon} />
                    </div>
                    <div className={styles.type}>
                        <span>Public</span>
                        <p>Anyone can find this group</p>
                    </div>
                    <div className={styles.state}>
                        {
                            selected === 'public' && <div></div>
                        }

                    </div>
                </div>

                <div className={`${styles.radio} ${selected === 'private' && styles.radio_active}`} onClick={() => setSelected('private')}
                >
                    <div className={styles.icon_}>
                        <EyeInvisibleFilled className={styles.icon} />
                    </div>
                    <div className={styles.type}>
                        <span>Private</span>
                        <p>Anyone can find this group</p>
                    </div>
                    <div className={styles.state}>
                        {
                            selected === 'private' && <div></div>
                        }
                    </div>
                </div>

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

export default EditPrivacy