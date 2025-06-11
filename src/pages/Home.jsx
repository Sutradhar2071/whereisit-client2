import React from 'react';
import ExtraSectionOne from './ExtraSectionOne';
import ExtraSectionTwo from './ExtraSectionTwo';
import HeroSection from './HeroSection';
import LatestItemsSection from './LatestItemsSection';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <LatestItemsSection></LatestItemsSection>
            <ExtraSectionOne></ExtraSectionOne>
            <ExtraSectionTwo></ExtraSectionTwo>
        </div>
    );
};

export default Home;