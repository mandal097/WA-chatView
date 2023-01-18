import React from 'react';
import styles from './Banner.module.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons'

function NextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className={styles.right_arrow}
            onClick={onClick}
        >
            <RightOutlined className={styles.icon} /></div>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className={styles.left_arrow}
            onClick={onClick}
        >
            <LeftOutlined className={styles.icon} />
        </div>
    );
}


const Banner = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };
    return (
        <div className={styles.banner}>
            <Slider {...settings} className={styles.slider}>
                <div className={styles.slides}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/wa-chat-59119.appspot.com/o/1673962618291model-x.jpg?alt=media&token=2c2a54cd-5940-4a1b-9fc6-6e870bf7a67f" alt="" />
                </div>
                <div className={styles.slides}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/wa-chat-59119.appspot.com/o/1667365878777fitness4.jfif?alt=media&token=02e3bf1f-ca8d-4c28-8695-27cb6e73b8b4" alt="" />
                </div>
                <div className={styles.slides}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/wa-chat-59119.appspot.com/o/1668880563119fitness3.jfif?alt=media&token=17cda7d4-d4ff-4183-a10a-dbf23e46f30f" alt="" />
                </div>
                <div className={styles.slides}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/wa-chat-59119.appspot.com/o/1673962618291model-x.jpg?alt=media&token=2c2a54cd-5940-4a1b-9fc6-6e870bf7a67f" alt="" />
                </div>
            </Slider>
        </div>
    )
}

export default Banner