import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Step1Throw } from './components/Step1Throw';
import { Step2Shake } from './components/Step2Shake';
import { Step3Result } from './components/Step3Result';
import { SettingsMenu } from './components/SettingsMenu';
import { HistoryPage } from './components/HistoryPage/HistoryPage';
import { FavoritesPage } from './components/FavoritesPage/FavoritesPage';
import { FortuneType } from './utils/fortune';
import { addFortuneRecord } from './utils/history';
import './styles/index.css';

type Step = 1 | 2 | 3 | 'history' | 'favorites';


function AppContent() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [fortune, setFortune] = useState<FortuneType | null>(null);

  const handleStep1Success = () => {
    setCurrentStep(2);
  };

  const handleStep2Result = (result: FortuneType) => {
    // 保存历史记录
    addFortuneRecord(result);
    setFortune(result);
    setCurrentStep(3);
  };

  const handleExitStep2 = () => {
    setCurrentStep(1);
    setFortune(null);
  };

  const handleStep3Retry = () => {
    setCurrentStep(2);
    setFortune(null);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setFortune(null);
  };

  const handleHistory = () => {
    setCurrentStep('history');
  };

  const handleBackFromHistory = () => {
    setCurrentStep(1);
  };

  const handleFavorites = () => {
    setCurrentStep('favorites');
  };

  const handleBackFromFavorites = () => {
    setCurrentStep(1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">{t('app.title')}</h1>
      </header>
      <SettingsMenu onHistory={handleHistory} onFavorites={handleFavorites} />
      
      {currentStep === 1 && (
        <Step1Throw onSuccess={handleStep1Success} onRestart={handleRestart} />
      )}
      
      {currentStep === 2 && (
        <Step2Shake onResult={handleStep2Result} onExit={handleExitStep2} />
      )}
      
      {currentStep === 3 && fortune && (
        <Step3Result 
          fortune={fortune} 
          onRetry={handleStep3Retry}
          onRestart={handleRestart}
        />
      )}
      
      {currentStep === 'history' && (
        <HistoryPage onBack={handleBackFromHistory} />
      )}
      
      {currentStep === 'favorites' && (
        <FavoritesPage onBack={handleBackFromFavorites} />
      )}
    </div>
  );
}

function App() {
  // 注册Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
