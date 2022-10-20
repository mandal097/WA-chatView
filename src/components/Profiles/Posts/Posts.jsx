import React, { useEffect } from 'react';
import styles from './Posts.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useRef } from 'react';
import PostCard from '../../PostCard/PostCard';
import Details from '../Details/Details';
import CreatePost from '../../CreatePost/CreatePost';
import EditDetailsModal from '../../_Modals/EditDetailsModal/EditDetailsModal';
import axios from '../../../config/axios';
import Loading from '../../Loading/Loading';

const Posts = () => {
    const { currentUser } = useSelector(state => state.user)
    const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
    const [bioText, setBioText] = useState('');
    const [loading, setLoading] = useState(false)
    const [showBioInput, setShowBioInput] = useState(false);
    const [owner, setOwner] = useState(false);
    const [posts, setPosts] = useState([]);
    const bioRef = useRef();
    const location = useLocation();
    const id = location.pathname.split('/')[2]

    useEffect(() => {
        const checkCLick = (e) => {
            if (showBioInput && !bioRef.current.contains(e.target)) {
                setShowBioInput(false)
            }
        }
        document.addEventListener('mousedown', checkCLick)
        return () => {
            document.removeEventListener('mousedown', checkCLick)
        }
    }, [showBioInput]);

    useEffect(() => {
        if (id === currentUser._id) {
            setOwner(true)
        } else {
            setOwner(false)
        }
    }, [id, currentUser])

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true)
                const res = await axios.get('/post/my-posts', {
                    headers: {
                        token: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setPosts(res.data.data)
                setLoading(false)
            } catch (error) {
                console.log('something went wrong');
                setLoading(false)
            }
        }
        getPosts()
    }, [])
    return (
        <div className={styles.posts}>

            <div className={styles.left}>
                <div className={`${styles.left_wrapper} ${'custom_scroll'}`}>
                    <div className={styles.intro}>
                        <h3>Intro</h3>
                        {!showBioInput && owner
                            ? <button onClick={() => setShowBioInput(!showBioInput)}>Add Bio</button>
                            : showBioInput && owner && <div className={styles.edit_bio} ref={bioRef}>
                                <textarea
                                    value={bioText}
                                    onChange={(e) => setBioText(e.target.value)}
                                    placeholder='Describe who you are...'
                                ></textarea>
                                <div className={styles.btns}>
                                    <button onClick={() => setShowBioInput(!showBioInput)}>Cancel</button>
                                    <button disabled={!bioText} style={{ cursor: !bioText ? 'not-allowed' : 'pointer' }}>Save</button>
                                </div>
                            </div>}

                        <Details id={id} />

                        {owner && <button onClick={() => setShowEditDetailsModal(true)}>Edit Intro</button>}
                    </div>


                    <div className={styles.photos}>
                        <div className={styles.head}>
                            <span>Photos</span>
                            <Link className={styles.link}>See All Photos</Link>
                        </div>
                        <div className={styles.photos_}>
                            <img src="https://scontent.fdel27-4.fna.fbcdn.net/v/t1.18169-9/28276317_493845827679312_2634791347943654370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=-cWeFV8OZYcAX_nqJNy&_nc_ht=scontent.fdel27-4.fna&oh=00_AT9rLvN3e_lsXlIbCz_kWlQv0OJJ4q_rZfeey1dBBOdWZg&oe=636F9E50" alt="" />
                            <img src="https://scontent.fdel27-4.fna.fbcdn.net/v/t1.18169-9/28276317_493845827679312_2634791347943654370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=-cWeFV8OZYcAX_nqJNy&_nc_ht=scontent.fdel27-4.fna&oh=00_AT9rLvN3e_lsXlIbCz_kWlQv0OJJ4q_rZfeey1dBBOdWZg&oe=636F9E50" alt="" />
                            <img src="https://scontent.fdel27-4.fna.fbcdn.net/v/t1.18169-9/28276317_493845827679312_2634791347943654370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=-cWeFV8OZYcAX_nqJNy&_nc_ht=scontent.fdel27-4.fna&oh=00_AT9rLvN3e_lsXlIbCz_kWlQv0OJJ4q_rZfeey1dBBOdWZg&oe=636F9E50" alt="" />
                            <img src="https://scontent.fdel27-4.fna.fbcdn.net/v/t1.18169-9/28276317_493845827679312_2634791347943654370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=-cWeFV8OZYcAX_nqJNy&_nc_ht=scontent.fdel27-4.fna&oh=00_AT9rLvN3e_lsXlIbCz_kWlQv0OJJ4q_rZfeey1dBBOdWZg&oe=636F9E50" alt="" />
                            <img src="https://scontent.fdel27-4.fna.fbcdn.net/v/t1.18169-9/28276317_493845827679312_2634791347943654370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=-cWeFV8OZYcAX_nqJNy&_nc_ht=scontent.fdel27-4.fna&oh=00_AT9rLvN3e_lsXlIbCz_kWlQv0OJJ4q_rZfeey1dBBOdWZg&oe=636F9E50" alt="" />
                            <img src="https://scontent.fdel27-4.fna.fbcdn.net/v/t1.18169-9/28276317_493845827679312_2634791347943654370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=-cWeFV8OZYcAX_nqJNy&_nc_ht=scontent.fdel27-4.fna&oh=00_AT9rLvN3e_lsXlIbCz_kWlQv0OJJ4q_rZfeey1dBBOdWZg&oe=636F9E50" alt="" />
                            <img src="https://scontent.fdel27-4.fna.fbcdn.net/v/t1.18169-9/28276317_493845827679312_2634791347943654370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=-cWeFV8OZYcAX_nqJNy&_nc_ht=scontent.fdel27-4.fna&oh=00_AT9rLvN3e_lsXlIbCz_kWlQv0OJJ4q_rZfeey1dBBOdWZg&oe=636F9E50" alt="" />
                            <img src="https://scontent.fdel27-4.fna.fbcdn.net/v/t1.18169-9/28276317_493845827679312_2634791347943654370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=-cWeFV8OZYcAX_nqJNy&_nc_ht=scontent.fdel27-4.fna&oh=00_AT9rLvN3e_lsXlIbCz_kWlQv0OJJ4q_rZfeey1dBBOdWZg&oe=636F9E50" alt="" />
                            <img src="https://scontent.fdel27-4.fna.fbcdn.net/v/t1.18169-9/28276317_493845827679312_2634791347943654370_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=-cWeFV8OZYcAX_nqJNy&_nc_ht=scontent.fdel27-4.fna&oh=00_AT9rLvN3e_lsXlIbCz_kWlQv0OJJ4q_rZfeey1dBBOdWZg&oe=636F9E50" alt="" />
                        </div>
                    </div>


                    <div className={styles.followers}>
                        <div className={styles.head}>
                            <span>Friends</span>
                            <Link className={styles.link}>See All Friends</Link>
                        </div>
                        <div className={styles.friends_count}>423 Friends</div>
                        <div className={styles.followers_}>

                            <div className={styles.card}>
                                <img src="https://scontent.fdel27-5.fna.fbcdn.net/v/t1.6435-9/168738929_499821881425162_8386386098057129348_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=41saZKivepUAX-6zDxZ&_nc_ht=scontent.fdel27-5.fna&oh=00_AT8CyDCcPw5HkZwl8s7ymIi-xHhV3zebApdwlOmY7pllPw&oe=63709154" alt="" />
                                <span>Ashish singh kuyal</span>
                            </div>

                            <div className={styles.card}>
                                <img src="https://scontent.fdel27-5.fna.fbcdn.net/v/t1.6435-9/168738929_499821881425162_8386386098057129348_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=41saZKivepUAX-6zDxZ&_nc_ht=scontent.fdel27-5.fna&oh=00_AT8CyDCcPw5HkZwl8s7ymIi-xHhV3zebApdwlOmY7pllPw&oe=63709154" alt="" />
                                <span>Ashish singh kuyal</span>
                            </div>
                            <div className={styles.card}>
                                <img src="https://scontent.fdel27-5.fna.fbcdn.net/v/t1.6435-9/168738929_499821881425162_8386386098057129348_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=41saZKivepUAX-6zDxZ&_nc_ht=scontent.fdel27-5.fna&oh=00_AT8CyDCcPw5HkZwl8s7ymIi-xHhV3zebApdwlOmY7pllPw&oe=63709154" alt="" />
                                <span>Ashish singh kuyal</span>
                            </div>
                            <div className={styles.card}>
                                <img src="https://scontent.fdel27-5.fna.fbcdn.net/v/t1.6435-9/168738929_499821881425162_8386386098057129348_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=41saZKivepUAX-6zDxZ&_nc_ht=scontent.fdel27-5.fna&oh=00_AT8CyDCcPw5HkZwl8s7ymIi-xHhV3zebApdwlOmY7pllPw&oe=63709154" alt="" />
                                <span>Ashish singh kuyal</span>
                            </div>
                            <div className={styles.card}>
                                <img src="https://scontent.fdel27-5.fna.fbcdn.net/v/t1.6435-9/168738929_499821881425162_8386386098057129348_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=41saZKivepUAX-6zDxZ&_nc_ht=scontent.fdel27-5.fna&oh=00_AT8CyDCcPw5HkZwl8s7ymIi-xHhV3zebApdwlOmY7pllPw&oe=63709154" alt="" />
                                <span>Ashish singh kuyal</span>
                            </div>
                            <div className={styles.card}>
                                <img src="https://scontent.fdel27-5.fna.fbcdn.net/v/t1.6435-9/168738929_499821881425162_8386386098057129348_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=41saZKivepUAX-6zDxZ&_nc_ht=scontent.fdel27-5.fna&oh=00_AT8CyDCcPw5HkZwl8s7ymIi-xHhV3zebApdwlOmY7pllPw&oe=63709154" alt="" />
                                <span>Ashish singh kuyal</span>
                            </div>
                            <div className={styles.card}>
                                <img src="https://scontent.fdel27-5.fna.fbcdn.net/v/t1.6435-9/168738929_499821881425162_8386386098057129348_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=41saZKivepUAX-6zDxZ&_nc_ht=scontent.fdel27-5.fna&oh=00_AT8CyDCcPw5HkZwl8s7ymIi-xHhV3zebApdwlOmY7pllPw&oe=63709154" alt="" />
                                <span>Ashish singh kuyal</span>
                            </div>
                            <div className={styles.card}>
                                <img src="https://scontent.fdel27-5.fna.fbcdn.net/v/t1.6435-9/168738929_499821881425162_8386386098057129348_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=41saZKivepUAX-6zDxZ&_nc_ht=scontent.fdel27-5.fna&oh=00_AT8CyDCcPw5HkZwl8s7ymIi-xHhV3zebApdwlOmY7pllPw&oe=63709154" alt="" />
                                <span>Ashish singh kuyal</span>
                            </div>
                            <div className={styles.card}>
                                <img src="https://scontent.fdel27-5.fna.fbcdn.net/v/t1.6435-9/168738929_499821881425162_8386386098057129348_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=41saZKivepUAX845-9s&_nc_ht=scontent.fdel27-5.fna&oh=00_AT_SW9iHdBGJo9taA8-mPOFF8aE5sUgedu0PPn1J50jz1g&oe=63709154" alt="" />
                                <span>Ashish singh kuyal</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className={styles.right}>
                {owner && <CreatePost />}

                {
                    posts.map(post => (
                        <>
                            {
                                loading
                                    ? <Loading font='10rem' color='white' />
                                    : <PostCard key={post._id} post={post} loading={loading} />
                            }
                        </>
                    ))
                }

            </div>
            {showEditDetailsModal && <EditDetailsModal setShowEditDetailsModal={setShowEditDetailsModal} />}
        </div>
    )
}

export default Posts