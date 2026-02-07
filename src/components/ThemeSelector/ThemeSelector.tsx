import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import './ThemeSelector.css';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const themes: Array<{ value: 'purple' | 'gold' | 'green'; label: string }> = [
    { value: 'purple', label: t('settings.theme.purple') },
    { value: 'gold', label: t('settings.theme.gold') },
    { value: 'green', label: t('settings.theme.green') },
  ];

  return (
    <div className="theme-selector">
      <div className="theme-label">{t('settings.theme')}:</div>
      <div className="theme-buttons">
        {themes.map((th) => (
          <button
            key={th.value}
            className={`theme-button ${theme === th.value ? 'active' : ''}`}
            onClick={() => setTheme(th.value)}
            aria-label={th.label}
            style={{
              backgroundColor: theme === th.value ? getThemeColor(th.value) : 'transparent',
              borderColor: getThemeColor(th.value),
            }}
          >
            {th.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const getThemeColor = (theme: 'purple' | 'gold' | 'green'): string => {
  switch (theme) {
    case 'purple':
      return '#9b59b6';
    case 'gold':
      return '#f39c12';
    case 'green':
      return '#27ae60';
  }
};
