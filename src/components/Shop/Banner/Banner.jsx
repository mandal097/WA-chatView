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


const Banner = ({ banners }) => {
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
                {
                    banners?.map(banner => (
                        <div className={styles.slides} key={banner.id}>
                            <img src={banner?.img} alt="" />
                            {/* <img src={`/assets/images/${banner?.img}`} alt="" /> */}
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default Banner