import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { drawFortune, FortuneType } from '../../utils/fortune';
import './Step2Shake.css';

interface Step2ShakeProps {
  onResult: (fortune: FortuneType) => void;
  onExit: () => void;
}

export const Step2Shake: React.FC<Step2ShakeProps> = ({ onResult, onExit }) => {
  const { t } = useLanguage();
  const [fortune, setFortune] = useState<FortuneType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrawFortune = () => {
    if (isProcessing || fortune) return;
    
    setIsProcessing(true);
    
    // 延迟显示结果，增加仪式感
    setTimeout(() => {
      const result = drawFortune();
      setFortune(result);
      setIsProcessing(false);
      
      // 延迟后进入下一步
      setTimeout(() => {
        onResult(result);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="step2-container pixel-container">
      <button className="exit-button" onClick={onExit}>
        ×
      </button>
      <h2>{t('step2.human.title')}</h2>
      
      <div className="shake-instruction">
        <p>{t('step2.human.instruction')}</p>
      </div>

      <div className="shake-area">
        <div className={`bamboo-tube ${fortune ? 'revealed' : ''} ${isProcessing ? 'shaking' : ''}`}>
          {!fortune && (
            <div className="bamboo-tube-content">
              <div className="bamboo-sticks">
                <div className="stick"></div>
                <div className="stick"></div>
                <div className="stick"></div>
                <div className="stick"></div>
                <div className="stick"></div>
              </div>
            </div>
          )}
          {fortune && (
            <div className={`fortune-reveal fortune-${fortune}`}>
              {fortune === 'shang' && t('step2.human.shang')}
              {fortune === 'zhong' && t('step2.human.zhong')}
              {fortune === 'xia' && t('step2.human.xia')}
            </div>
          )}
        </div>
      </div>

      {!fortune && (
        <button 
          className="draw-fortune-button"
          onClick={handleDrawFortune}
          disabled={isProcessing}
        >
          {isProcessing ? t('step2.human.processing') : t('step2.human.draw')}
        </button>
      )}




    </div>
  );
};
