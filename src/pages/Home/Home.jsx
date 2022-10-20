import React from 'react';
import Feed from '../../components/Home/Feed/Feed';
import StorySection from '../../components/Home/StorySection/StorySection';
import Suggestions from '../../components/Home/Suggestions/Suggestions';
import styles from './Home.module.scss'
const Home = () => {
    return (
        <div className={`${styles.home}`}>
            <div className={styles.left}>
                <div className={styles.story_section}>
                    <StorySection/>
                </div>
                <div className={styles.feed_section}>
                    <Feed />
                </div>
            </div>
            <div className={styles.right}>
                <Suggestions />
            </div>
        </div>
    )
}

export default Home