/*
 * @Author: jhl
 * @Date: 2021-08-20 14:49:28
 * @LastEditors: jhl
 * @LastEditTime: 2021-08-20 14:57:53
 * @Description:
 */
import { Image, Carousel as AntdCarousel } from 'antd';
import styles from './Carousel.module.css';
import carouselImage1 from '../../assets/images/carousel_1.jpg';
import carouselImage2 from '../../assets/images/carousel_2.jpg';
import carouselImage3 from '../../assets/images/carousel_3.jpg';

const Carousel: React.FC = () => {
    return (
        <AntdCarousel autoplay className={styles.slider}>
            <Image src={carouselImage1} alt='走马灯1' />
            <Image src={carouselImage2} alt='走马灯2' />
            <Image src={carouselImage3} alt='走马灯3' />
        </AntdCarousel>
    );
};

export default Carousel;
