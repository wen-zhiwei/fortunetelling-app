import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Step1Throw.css';

type CupResult = 'ping' | 'tu'; // 平（阳）或凸（阴）
type ThrowResult = 'sheng' | 'xiao' | 'yin' | null; // 圣杯、笑杯、阴杯

interface Step1ThrowProps {
  onSuccess: () => void; // 获得圣杯时的回调
  onRestart: () => void; // 重新开始（退出）
}

export const Step1Throw: React.FC<Step1ThrowProps> = ({ onSuccess, onRestart }) => {
  const { t } = useLanguage();
  const [attempts, setAttempts] = useState(3);
  const [isThrowing, setIsThrowing] = useState(false);
  const [result, setResult] = useState<ThrowResult>(null);
  const [cup1, setCup1] = useState<CupResult | null>(null);
  const [cup2, setCup2] = useState<CupResult | null>(null);

  const throwCups = () => {
    if (attempts <= 0 || isThrowing) return;

    setIsThrowing(true);
    setResult(null);

    // 投掷动画延迟
    setTimeout(() => {
      // 随机生成两个杯筊的结果
      const cup1Result: CupResult = Math.random() < 0.5 ? 'ping' : 'tu';
      const cup2Result: CupResult = Math.random() < 0.5 ? 'ping' : 'tu';

      setCup1(cup1Result);
      setCup2(cup2Result);

      // 判断结果
      let throwResult: ThrowResult;
      if (cup1Result !== cup2Result) {
        // 一平一凸 = 圣杯
        throwResult = 'sheng';
      } else if (cup1Result === 'ping') {
        // 两平 = 笑杯
        throwResult = 'xiao';
      } else {
        // 两凸 = 阴杯
        throwResult = 'yin';
      }

      setResult(throwResult);
      setIsThrowing(false);
      setAttempts(prev => prev - 1);

      // 如果是圣杯，延迟后进入下一步
      if (throwResult === 'sheng') {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    }, 800);
  };

  const reset = () => {
    setAttempts(3);
    setResult(null);
    setCup1(null);
    setCup2(null);
    setIsThrowing(false);
  };

  const canThrow = attempts > 0 && !isThrowing && result !== 'sheng';

  return (
    <div className="step1-container pixel-container">
      <button className="exit-button" onClick={onRestart}>
        ×
      </button>
      <h2>{t('step1.human.title')}</h2>
      <p className="instruction">{t('step1.human.instruction')}</p>
      
      <div className="attempts-info">
        {t('step1.human.attempts')}: {attempts}
      </div>

      <div className="cups-container">
        <div className={`cup cup1 ${cup1 || ''} ${isThrowing ? 'throwing' : ''}`}>
          <div className="cup-body">
            <div className="cup-crescent"></div>
          </div>
        </div>
        <div className={`cup cup2 ${cup2 || ''} ${isThrowing ? 'throwing' : ''}`}>
          <div className="cup-body">
            <div className="cup-crescent"></div>
          </div>
        </div>
      </div>

      {result && (
        <div className={`result result-${result}`}>
          <div className="result-text">
            {result === 'sheng' && t('step1.result.sheng')}
            {result === 'xiao' && t('step1.result.xiao')}
            {result === 'yin' && t('step1.result.yin')}
          </div>
          <div className="result-desc">
            {result === 'sheng' && t('step1.result.sheng.desc')}
            {result === 'xiao' && t('step1.result.xiao.desc')}
            {result === 'yin' && t('step1.result.yin.desc')}
          </div>
        </div>
      )}



      {result !== 'sheng' && attempts > 0 && (
        <div className="buttons">
          <button 
            onClick={throwCups} 
            disabled={!canThrow}
            className="throw-button"
          >
            {t('button.throw')}
          </button>
        </div>
      )}
      {result !== 'sheng' && attempts <= 0 && (
        <div className="buttons">
          <button onClick={reset} className="retry-button">
            {t('button.retry')}
          </button>
        </div>
      )}
    </div>
  );
};
