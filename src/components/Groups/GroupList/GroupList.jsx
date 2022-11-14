import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './GroupList.module.scss';


const Card = ({ count }) => {
    const { currentUser } = useSelector(state => state.user)
    console.log(count);
    return (
        <div className={styles.card_}>
            <div className={styles.card} style={{ alignItems: count === 'all' ? 'flex-start' : 'center' }}>
                <div className={styles.img}>
                    <img src="https://media.istockphoto.com/id/1358014313/photo/group-of-elementary-students-having-computer-class-with-their-teacher-in-the-classroom.jpg?b=1&s=170667a&w=0&k=20&c=_UfKmwUAFyylJkXm75hsnM9bPRajhoK_RT5t6VWMovo=" alt="img" />
                </div>
                <div className={styles.details}>
                    <Link className={styles.link}>SB FlexiFunnels DOer's Community </Link>
                    <div className={styles.counters}>
                        <p>Public · 64K followers · 10+ posts a day · 126 followers</p>
                    </div>
                    {
                        count === 'all' &&
                        <div className={styles.friend}>
                            <div className={styles.img}>
                                <img src={currentUser?.profilePic} alt="" />
                            </div>
                            <p>1 friend is a follower</p>
                        </div>
                    }
                </div>
                <button>Join</button>
            </div>

        </div>
    )
}
const GroupList = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('q');
    const count = searchParams.get('count');
    console.log(searchQuery);

    const handleQuery = () => {
        setSearchParams({ 'q': searchQuery, 'count': 'all' })
    }
    return (
        <div className={styles.group_list} style={{ backgroundColor: count === 'all' ? 'var(--bgLight)' : 'var(--bgDark)' }}>
            <h2 style={{ color: count === 'all' ? 'var(--text)' : 'var(--textSoft)' }}>Groups</h2>
            {
                count === 'all' ?
                    arr.map(group => (
                        <Card key={group} count={count} />
                    )) :
                    arr.slice(0, 2).map(group => (
                        <Card key={group} count={count} />
                    ))
            }
            {
                count !== 'all' &&
                <button className={styles.button} onClick={() => {
                    handleQuery()
                }}>See All</button>
            }
        </div>
    )
}

export default GroupList