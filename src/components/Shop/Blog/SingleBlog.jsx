import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Blog.module.scss'

const SingleBlog = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.single_blog}>
            <div className={styles.cover_img}>
                {/* <img src="/assets/images/blog_one.webp" alt="" /> */}
                <img src="https://media.istockphoto.com/id/1257108641/photo/camera-on-sound-on.jpg?s=612x612&w=0&k=20&c=IMMob1GcC1MsdkYR5DRXToaLg6zUEpqxTAsKcbZBgtI=" alt="" />
            </div>
            <div className={styles.content}>
                <h1>The topic of the current blog </h1>
                <p>loremBeing full blown coffee lovers ourselves and by learning more about our consumers and fellow coffee drinkers we thought about taking our idea of providing absolutely delicious coffee to the next level by also making coffee tools and accessories. We also made sure that these coffee tools and accessories are stylish, sturdy, and easy to use and store at home so they don’t take up too much space in your kitchen. The only space they will be taking is in your heart! Another idea behind these coffee tools and accessories was to make them effortlessly portable, so you can not only make your favourite coffee at home but also take them anywhere with you and make your favourite coffee drinks.Being full blown coffee lovers ourselves and by learning more about our consumers and fellow coffee drinkers we thought about taking our idea of providing absolutely delicious coffee to the next level by also making coffee tools and accessories. We also made sure that these coffee tools and accessories are stylish, sturdy, and easy to use and store at home so they don’t take up too much space in your kitchen. The only space they will be taking is in your heart! Another idea behind these coffee tools and accessories was to make them effortlessly portable, so you can not only make your favourite coffee at home but also take them anywhere with you and make your favourite coffee drinks.</p>
            </div>
            <button onClick={()=>navigate(-1)}>Go Back</button>
        </div>
    )
}

export default SingleBlog