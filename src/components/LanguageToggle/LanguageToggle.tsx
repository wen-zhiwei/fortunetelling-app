import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './LanguageToggle.css';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button 
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      {language === 'zh' ? 'EN' : '中文'}
    </button>
  );
};
