import  { useEffect } from 'react';
import Slider from './Slider/Slider.js'
const Home = () => {
    useEffect(() => {
        document.title = 'Home Page'
    })
    return (
        <div>
            <Slider></Slider>
        </div>
    );
};

export default Home;