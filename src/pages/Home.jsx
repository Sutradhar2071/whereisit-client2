import React from 'react';
import ExtraSectionOne from './ExtraSectionOne';
import ExtraSectionTwo from './ExtraSectionTwo';
import HeroSection from './HeroSection';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <ExtraSectionOne></ExtraSectionOne>
            <ExtraSectionTwo></ExtraSectionTwo>
        </div>
    );
};

export default Home;