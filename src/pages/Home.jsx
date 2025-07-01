import React from 'react';
import ExtraSectionOne from './ExtraSectionOne';
import ExtraSectionTwo from './ExtraSectionTwo';
import HeroSection from './HeroSection';
import LatestItemsSection from './LatestItemsSection';
import useTitle from "../hooks/useTitle";
import NewsletterSection from './NewsletterSection';

const Home = () => {
    useTitle("WhereIsIt | Home")
    return (
        <div>
            <HeroSection></HeroSection>
            <LatestItemsSection></LatestItemsSection>
            <ExtraSectionOne></ExtraSectionOne>
            <ExtraSectionTwo></ExtraSectionTwo>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;