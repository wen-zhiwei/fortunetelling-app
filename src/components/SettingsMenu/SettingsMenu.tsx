import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import './SettingsMenu.css';

interface SettingsMenuProps {
  onHistory: () => void;
  onFavorites: () => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ onHistory, onFavorites }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  const handleThemeChange = (newTheme: 'purple' | 'gold' | 'green') => {
    setTheme(newTheme);
  };

  return (
    <div className="settings-menu-container">
      <button 
        className="settings-button"
        onClick={toggleMenu}
        aria-label="Settings"
      >
        <div className="settings-icon">
          <div className="icon-bar"></div>
          <div className="icon-bar"></div>
          <div className="icon-bar"></div>
        </div>
      </button>

      {isOpen && (
        <div className="settings-dropdown">
          <div className="settings-section">
            <h3>{t('settings.language')}</h3>
            <button 
              className="language-option"
              onClick={toggleLanguage}
            >
              {language === 'zh' ? 'English' : '中文'}
            </button>
          </div>

          <div className="settings-section">
            <h3>{t('settings.theme')}</h3>
            <div className="theme-options">
              <button 
                className={`theme-option ${theme === 'purple' ? 'active' : ''}`}
                onClick={() => handleThemeChange('purple')}
                aria-label="Purple theme"
              >
                <div className="theme-color purple"></div>
                <span>{t('settings.theme.purple')}</span>
              </button>
              <button 
                className={`theme-option ${theme === 'gold' ? 'active' : ''}`}
                onClick={() => handleThemeChange('gold')}
                aria-label="Gold theme"
              >
                <div className="theme-color gold"></div>
                <span>{t('settings.theme.gold')}</span>
              </button>
              <button 
                className={`theme-option ${theme === 'green' ? 'active' : ''}`}
                onClick={() => handleThemeChange('green')}
                aria-label="Green theme"
              >
                <div className="theme-color green"></div>
                <span>{t('settings.theme.green')}</span>
              </button>
            </div>
          </div>

          <div className="settings-section">
            <button 
              className="favorites-option"
              onClick={onFavorites}
            >
              {t('settings.favorites')}
            </button>
          </div>

          <div className="settings-section">
            <button 
              className="history-option"
              onClick={onHistory}
            >
              {t('settings.history')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};