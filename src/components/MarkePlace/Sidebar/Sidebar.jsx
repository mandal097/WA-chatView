import React, { useEffect, useRef, useState } from 'react';
import styles from './Sidebar.module.scss'
import {
    CarFilled,
    ClockCircleOutlined,
    HeartFilled,
    MobileOutlined,
    PlusOutlined,
    RightOutlined,
    // ScheduleFilled,
    SearchOutlined,
    ShopFilled,
    // ShoppingFilled,
    SkinFilled,
    TagsFilled
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [active, setActive] = useState('');
    const location = useLocation();
    const navigate = useNavigate()
    const activeState = location.pathname.split('/')[2];
    const activeStateYou = location.pathname.split('/')[3];

    const listRef = useRef();
    // const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const checkClick = (e) => {
            if (searchTerm && !listRef.current.contains(e.target)) {
                setSearchTerm('')
            }
        }
        document.addEventListener('mousedown', checkClick);
        return () => {
            document.removeEventListener('mousedown', checkClick);
        }
    }, [searchTerm, setSearchTerm]);

    useEffect(() => {
        if (activeState === 'you') {
            setActive(activeStateYou)
        } else {
            setActive(activeState)
        }
        if (activeState === 'category') {
            setActive(activeStateYou)
        }
        if (activeState === undefined) {
            setActive('')
        }

    }, [activeState, activeStateYou])
    if (activeState === 'item') return null;
    if (activeState === 'create') return null;
    return (
        <div className={styles.sidebar}>
            <div className={styles.top}>
                <div className={styles.heading}>
                    <span>Marketplace</span>
                </div>
                <div className={styles.search_box}>
                    <SearchOutlined className={styles.icon} />
                    <input
                        type="search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        placeholder='search marketplace...'
                    />
                    {searchTerm && <div className={styles.search_item} ref={listRef}>
                        <ClockCircleOutlined className={styles.icon} />
                        search for <span>{searchTerm}</span>
                    </div>}
                </div>
            </div>
            <div className={`${styles.bottom} ${'custom_scroll'}`}>

                <Link onClick={() => setActive('')} to=''
                    className={`${styles.links} ${active === '' && styles.active}`}>
                    <div className={styles.icon_}>
                        <ShopFilled className={styles.icon} />
                    </div>
                    <span>Browse all</span>
                </Link>

                {/* <Link onClick={() => setActive('inbox')} to='inbox'
                    className={`${styles.links} ${active === 'inbox' && styles.active}`}>
                    <div className={styles.icon_}>
                        <ScheduleFilled className={styles.icon} />
                    </div>
                    <span>Inbox</span>
                </Link>

                <Link onClick={() => setActive('buying')} to='you/buying'
                    className={`${styles.links} ${active === 'buying' && styles.active}`}>
                    <div className={styles.icon_}>
                        <ShoppingFilled className={styles.icon} />
                    </div>
                    <span>Buying</span>
                    <div style={{ marginLeft: 'auto', marginRight: '1rem' }}>
                        <RightOutlined className={styles.icon} />
                    </div>
                </Link> */}

                <Link onClick={() => setActive('selling')} to='you/selling'
                    className={`${styles.links} ${active === 'selling' && styles.active}`}>
                    <div className={styles.icon_}>
                        <TagsFilled className={styles.icon} />
                    </div>
                    <span>Selling</span>
                    <div style={{ marginLeft: 'auto', marginRight: '1rem' }}>
                        <RightOutlined className={styles.icon} />
                    </div>
                </Link>

                <button className={styles.create_group_btn}
                    onClick={() => navigate('create')}>
                    <PlusOutlined className={styles.icon} />
                    <span>Create new listing</span>
                </button>

                <div className={styles.group_list} style={{ gap: '0.5rem' }}>
                    <h2>Common Categories</h2>
                    <Link to='category/clothes'
                        onClick={() => setActive('clothes')}
                        style={{ margin: '0' }}
                        className={`${styles.links}  ${active === 'clothes' && styles.active}`}>
                        <div className={styles.icon_}>
                            <SkinFilled className={styles.icon} />
                        </div>
                        <span>Clothes</span>
                    </Link>
                    <Link to='category/vehicles'
                        onClick={() => setActive('vehicles')}
                        style={{ margin: '0' }}
                        className={`${styles.links}  ${active === 'vehicles' && styles.active}`}>
                        <div className={styles.icon_}>
                            <CarFilled className={styles.icon} />
                        </div>
                        <span>Vehicles</span>
                    </Link>

                    <Link to='category/electronics'
                        onClick={() => setActive('electronics')}
                        style={{ margin: '0' }}
                        className={`${styles.links}  ${active === 'electronics' && styles.active}`}>
                        <div className={styles.icon_}>
                            <MobileOutlined className={styles.icon} />
                        </div>
                        <span>Electronics</span>
                    </Link>

                    <Link to='category/family'
                        onClick={() => setActive('family')}
                        style={{ margin: '0' }}
                        className={`${styles.links}  ${active === 'family' && styles.active}`}>
                        <div className={styles.icon_}>
                            <HeartFilled className={styles.icon} />
                        </div>
                        <span>Family</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar