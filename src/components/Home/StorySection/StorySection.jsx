import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './StorySection.module.scss';

const Card = () => {
    const { currentUser } = useSelector(state => state.user);
    return (
        <div className={styles.story_card}>
            <div className={styles.img} style={{border: "2px solid tomato"}}>
                <img src={currentUser.profilePic} alt="profile_picture" />
            </div>
            <p className={styles.name}>{'Amarnath kumar mandal'.split(' ')[0]}</p>
        </div>
    )
}



const StorySection = () => {
    const [transform, setTransform] = useState(0);
    const scrollRef = useRef();

    const handleScroll = (direction) => {
        const width = scrollRef.current.clientWidth;
        const edge = width - (4 * 65)
        if (direction === 'left' && transform > 0) {
            setTransform(transform - (4 * 65))
        }
        if (direction === 'right') {
            setTransform(transform + (4 * 65))
        }
        if (direction === 'right' && (transform + 4 * 65) >= width) {
            setTransform(edge - 2 * 65)
        }
        console.log(width);
        console.log(transform);
        console.log(direction);
    }

    return (
        <>
            <div className={`${styles.controller} ${styles.controller_left}`}
                onClick={() => handleScroll('left')}
            >
                <LeftOutlined className={styles.icon} />
            </div>
            <div className={styles.stories_}>
                <div className={styles.scroll}
                    ref={scrollRef}
                    style={{ transform: `translateX(${-transform}px)` }}>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
            <div className={`${styles.controller} ${styles.controller_right}`}
                onClick={() => handleScroll('right')}
            >
                <RightOutlined className={styles.icon} />
            </div>
        </>
    )
}

export default StorySection