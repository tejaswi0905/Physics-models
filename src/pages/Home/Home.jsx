import React from 'react';
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/sections/HeroSection/HeroSection';
import FeatureGallery from '../../components/sections/FeatureGallery/FeatureGallery';

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <FeatureGallery />
    </Layout>
  );
};

export default Home;
