import React, { useState } from 'react';
import styles from './EditProfileModal.module.scss';
import {
    CloseOutlined,
    BankFilled,
    HomeFilled,
    MailFilled,
    InstagramFilled,
    PhoneFilled,
    ClockCircleFilled,
    UserOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import EditDetailsModal from '../EditDetailsModal/EditDetailsModal';

const EditProfileModal = ({ setShowEditProfileModal }) => {
    const { currentUser } = useSelector(state => state.user);
    const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
    const [showBioInput, setShowBioInfo] = useState(false);
    const [profile, setProfile] = useState('');
    const [coverImg, setCoverImg] = useState('');
    const [bioText, setBioText] = useState('');
    return (
        <div className={styles.edit_profile_modal}>
            <div className={styles.body}>
                <div className={styles.close} onClick={() => setShowEditProfileModal(false)}>
                    <CloseOutlined className={styles.icon} />
                </div>
                <div className={styles.head}>Edit Profile</div>

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
                        <div className={styles.edit} onClick={() => setShowBioInfo(!showBioInput)}>
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
                                <button onClick={() => setShowBioInfo(!showBioInput)}>Cancel</button>
                                <button disabled={!bioText} style={{cursor:!bioText?'not-allowed':'pointer'}}>Save</button>
                            </div>
                        </div>}
                </div>

                <div className={`${styles.update_sections} ${styles.intro_section}`}>
                    <div className={styles.update_options}>
                        <span>Customize your  intro</span>
                        <div className={styles.edit} onClick={() => setShowEditDetailsModal(true)}>Edit</div>
                    </div>
                    <div className={styles.intros_}>
                        <ul>
                            <li>
                                <div className={styles.icon_}><UserOutlined className={styles.icon} /></div>
                                <div className={styles.fields}><p>{currentUser.name}</p></div>
                            </li>
                            <li>
                                <div className={styles.icon_}><MailFilled className={styles.icon} /></div>
                                <div className={styles.fields}><p>{currentUser.email}</p></div>
                            </li>
                            <li>
                                <div className={styles.icon_}><PhoneFilled className={styles.icon} /></div>
                                <div className={styles.fields}> <p>{currentUser?.phone}</p></div>
                            </li>
                            <li>
                                <div className={styles.icon_}><ClockCircleFilled className={styles.icon} /></div>
                                <div className={styles.fields}>Joined on <p>{currentUser.createdAt.slice(0, 4)}</p></div>
                            </li>
                            <li>
                                <div className={styles.icon_}><HomeFilled className={styles.icon} /></div>
                                <div className={styles.fields}>Lives in <p>New Delhi</p></div>
                            </li>
                            <li>
                                <div className={styles.icon_}><BankFilled className={styles.icon} /></div>
                                <div className={styles.fields}>went to <p>SS khalsa sr. secc school</p></div>
                            </li>
                            <li>
                                <div className={styles.icon_}><InstagramFilled className={styles.icon} /></div>
                                <div className={styles.fields}><a href="www.instagram.com">www.instagram.com</a></div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            {showEditDetailsModal && <EditDetailsModal setShowEditDetailsModal={setShowEditDetailsModal} />}
        </div>
    )
}

export default EditProfileModal