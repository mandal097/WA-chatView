import React, { useState } from 'react';
import styles from './EditProfileModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import EditDetailsModal from '../EditDetailsModal/EditDetailsModal';
import Details from '../../Profiles/Details/Details';
import Modal from '../ModalLayout';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading';
import { updateBio, updateProfilePic } from '../../../redux/userRedux';
import { useUpload } from '../../../hooks/useUpload';

const EditProfileModal = ({ setShowEditProfileModal }) => {
    const { currentUser } = useSelector(state => state.user);
    const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
    const [showBioInput, setShowBioInput] = useState(false);
    const [profile, setProfile] = useState('');
    const [bioText, setBioText] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { uploadPerc, url } = useUpload(profile);

    const updateprofileImg = async (e, param) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`/user/update-profile`, {
                profilePic: url ? url : currentUser?.profilePic,
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res.data);
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                dispatch(updateProfilePic({ profilePic: url }))
                setLoading(false);
            }
        } catch (error) {
            setLoading(true);
            toast.error('something went wrong')
        }
    }

    const updatebio = async (e, param) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`/user/update-profile`, {
                bio: bioText ? bioText : currentUser?.bioText
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(res.data);
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                dispatch(updateBio({ bio: bioText }))
                setLoading(false);
            }
        } catch (error) {
            setLoading(true);
            toast.error('something went wrong')
        }
    }


    return (
        <Modal
            overflow='scroll'
            width='70rem'
            height='max-content'
            margin='6rem 0'
            zIndex='10001'
            head='Edit profile'
            onClick={() => setShowEditProfileModal(false)}
        >
            <ToastContainer className='toaster' />
            <div className={`${styles.update_sections} ${styles.profile_section}`}>
                <div className={styles.update_options}>
                    <span>Profile picture</span>
                    <label htmlFor='profilePic' className={styles.edit}>{profile ? 'Change' : 'Edit'}</label>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        accept='image/*'
                        id="profilePic"
                        onChange={(e) => setProfile(e.target.files[0])}
                    />
                </div>
                <div className={styles.img}>
                    {
                        profile
                            ? <img src={URL.createObjectURL(profile)} alt="profile pictures" />
                            : <img src={currentUser.profilePic} alt="profile pictures" />
                    }
                </div>
                {profile && uploadPerc === 100 && <button onClick={updateprofileImg}>{loading ? <Loading /> : 'Update profile picture'}</button>}
                {uploadPerc < 99 && uploadPerc > 0 &&
                    <button >{'uploading ' + uploadPerc + '%'}  </button>}
            </div>

            <div className={`${styles.update_sections} ${styles.bio_section}`}>
                <div className={styles.update_options}>
                    <span> Bio</span>
                    <div className={styles.edit} onClick={() => setShowBioInput(!showBioInput)}>
                        {showBioInput ? 'Cancel' : 'Add'}
                    </div>
                </div>
                {!showBioInput
                    ? <div className={styles.bio}> Describe yourself... </div>
                    : <div className={`${styles.bio} ${styles.bio_inputs}`}>
                        <textarea
                            value={bioText}
                            onChange={(e) => setBioText(e.target.value)}
                            placeholder='write something about yourself...'
                        ></textarea>
                        <div className={styles.btns}>
                            <button style={{ cursor: 'default' }}>{50 - bioText?.length} characters</button>
                            <button onClick={() => setShowBioInput(!showBioInput)}>Cancel</button>
                            <button
                                onClick={updatebio}
                                disabled={!bioText}
                                style={{ cursor: !bioText ? 'not-allowed' : 'pointer' }}>{loading ? <Loading /> : 'Save'}</button>
                        </div>
                    </div>}
            </div>

            <div className={`${styles.update_sections} ${styles.intro_section}`}>
                <div className={styles.update_options}>
                    <span>Customize your  intro</span>
                    <div className={styles.edit} onClick={() => setShowEditDetailsModal(true)}>Edit</div>
                </div>
                <div className={styles.intros_}>
                    <Details />
                </div>
            </div>
            {showEditDetailsModal && <EditDetailsModal setShowEditDetailsModal={setShowEditDetailsModal} />}
        </Modal >
    )
}

export default EditProfileModal