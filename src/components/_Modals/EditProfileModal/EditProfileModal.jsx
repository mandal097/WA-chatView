import React, { useState } from 'react';
import styles from './EditProfileModal.module.scss';
import { useSelector } from 'react-redux';
import EditDetailsModal from '../EditDetailsModal/EditDetailsModal';
import Details from '../../Profiles/Details/Details';
import Modal from '../ModalLayout';

const EditProfileModal = ({ setShowEditProfileModal }) => {
    const { currentUser } = useSelector(state => state.user);
    const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
    const [showBioInput, setShowBioInput] = useState(false);
    const [profile, setProfile] = useState('');
    const [coverImg, setCoverImg] = useState('');
    const [bioText, setBioText] = useState('');
    return (
        <Modal
            overflow='scroll'
            width='70rem'
            height='max-content'
            margin='6rem 0'
            zIndex='100'
            head='Edit profile'
            onClick={() => setShowEditProfileModal(false)}
        >
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
                {profile && <button>Update profile picture</button>}
            </div>

            <div className={`${styles.update_sections} ${styles.cover_section}`}>
                <div className={styles.update_options}>
                    <span>Cover photo</span>
                    <label htmlFor='coverImg' className={styles.edit}>{coverImg ? 'change' : 'Edit'}</label>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        accept='image/*'
                        id="coverImg"
                        onChange={(e) => setCoverImg(e.target.files[0])}
                    />
                </div>
                <div className={styles.img}>
                    {
                        coverImg
                            ? <img src={URL.createObjectURL(coverImg)} alt="profile pictures" />
                            : <img src={currentUser.profilePic} alt="profile pictures" />
                    }

                </div>
                {coverImg && <button>Update cover image</button>}
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
                            <button onClick={() => setShowBioInput(!showBioInput)}>Cancel</button>
                            <button disabled={!bioText} style={{ cursor: !bioText ? 'not-allowed' : 'pointer' }}>Save</button>
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