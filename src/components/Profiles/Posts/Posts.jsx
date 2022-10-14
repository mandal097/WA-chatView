import React from 'react';
import styles from './Posts.module.scss';
import { ReadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AddPost from '../../AddPostModal/AddPost';
import PostCard from '../../PostCard/PostCard';

const Posts = () => {
    return (
        <div className={styles.posts}>
            <div className={styles.left}>
                <div className={styles.left_wrapper}>
                    <div className={styles.intro}>
                        <h3>Intro</h3>
                        <button>Add Bio</button>
                        <div className={styles.intro_}>
                            <ReadOutlined className={styles.icon} /> <p>Went to SS Khalsa Sr. Sec. School, Lajpat nagar, New delhi.</p>
                        </div>
                        <div className={styles.intro_}>
                            <ReadOutlined className={styles.icon} /> <p>We School, Lajpat nagar, New delhi.</p>
                        </div>
                        <div className={styles.intro_}>
                            <ReadOutlined className={styles.icon} /> <p>Went to SS Khalsa Sr. Sec. School, Lajpat nagar, New delhi.</p>
                        </div>
                        <div className={styles.intro_}>
                            <ReadOutlined className={styles.icon} /> <p>Went to SS Khalsa Sr. Sec. School, Lajpat nagar, New delhi.</p>
                        </div>
                        <button>Edit Intro</button>
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
                <AddPost />

                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                
            </div>
        </div>
    )
}

export default Posts