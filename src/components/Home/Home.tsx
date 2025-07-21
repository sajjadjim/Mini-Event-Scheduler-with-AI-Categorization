import  { useEffect } from 'react';
import Slider from './Slider/Slider.js'
import Section2 from './section2/Section2.js';
const Home = () => {
    useEffect(() => {
        document.title = 'Home Page'
    })
    return (
        <div>
            <Slider></Slider>
            <Section2></Section2>
        </div>
    );
};

export default Home;