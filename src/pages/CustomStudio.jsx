import React, { useState, useEffect } from 'react';
import HeroSection from '../components/custom-studio/HeroSection';
import PopularDesignsSection from '../components/custom-studio/PopularDesignsSection';
import CustomStudioForm from '../components/custom-studio/CustomStudioForm';
import WhatsAppBanner from '../components/custom-studio/WhatsAppBanner';

export const CustomStudio = () => {
  const [selectedDesign, setSelectedDesign] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Custom T-Shirt Studio | KODE X ATTIRE';
  }, []);

  const handleScrollToForm = () => {
    const el = document.getElementById('custom-order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDesign = (designTitle) => {
    setSelectedDesign(designTitle);
    handleScrollToForm();
  };

  return (
    <div className="w-full bg-white">
      {/* 1. Hero Section */}
      <HeroSection onScrollToStudio={handleScrollToForm} />

      {/* 2. Popular Designs Inspiration Grid */}
      <PopularDesignsSection onSelectDesign={handleSelectDesign} />

      {/* 3. Quick Help WhatsApp Banner */}
      <WhatsAppBanner />

      {/* 4. Custom T-Shirt Studio Order Form */}
      <CustomStudioForm selectedDesign={selectedDesign} />
    </div>
  );
};

export default CustomStudio;
