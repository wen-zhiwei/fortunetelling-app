import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FortuneType } from '../../utils/fortune';
import { getRandomAffirmation } from '../../utils/affirmations';
import { addFavorite, removeFavorite, getFavorites } from '../../utils/favorites';
import './Step3Result.css';

interface Step3ResultProps {
  fortune: FortuneType;
  onRetry: () => void; // 中签时返回第二步
  onRestart: () => void; // 重新开始
}

export const Step3Result: React.FC<Step3ResultProps> = ({ fortune, onRetry, onRestart }) => {
  const { t, language } = useLanguage();
  const [isReceived, setIsReceived] = useState(false);
  const [isThrownAway, setIsThrownAway] = useState(false);
  const [affirmation, setAffirmation] = useState('');
  const [currentAffirmation, setCurrentAffirmation] = useState({ zh: '', en: '' });
  const [isFav, setIsFav] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const zhAffirmation = getRandomAffirmation(fortune, 'zh');
    const enAffirmation = getRandomAffirmation(fortune, 'en');
    setCurrentAffirmation({ zh: zhAffirmation, en: enAffirmation });
    
    const displayAffirmation = getRandomAffirmation(fortune, language as 'zh' | 'en');
    setAffirmation(displayAffirmation);
    
    // 重置收藏状态
    setIsFav(false);
    setIsFavorited(false);
  }, [fortune, language]);

  const handleFavorite = () => {
    // 检查当前肯定语是否已收藏
    const isCurrentlyFav = getFavorites().some(fav => 
      fav.zh === currentAffirmation.zh && fav.en === currentAffirmation.en
    );
    
    if (isCurrentlyFav) {
      // 取消收藏
      const favorites = getFavorites();
      const favoriteToRemove = favorites.find(fav => 
        fav.zh === currentAffirmation.zh && fav.en === currentAffirmation.en
      );
      
      if (favoriteToRemove) {
        removeFavorite(favoriteToRemove.id);
        setIsFav(false);
      }
    } else {
      // 添加收藏
      const success = addFavorite(currentAffirmation);
      if (success) {
        setIsFav(true);
        setIsFavorited(true);
        // 2秒后重置收藏成功状态
        setTimeout(() => {
          setIsFavorited(false);
        }, 2000);
      }
    }
  };

  const handleReceive = () => {
    setIsReceived(true);
  };

  const handleThrowAway = () => {
    setIsThrownAway(true);
    // 移除自动跳转，保持在当前页面
  };

  const handleRetry = () => {
    onRetry();
  };

  return (
    <div className="step3-container pixel-container">
      <button className="exit-button" onClick={onRestart}>
        ×
      </button>
      <h2>{t('step3.human.title')}</h2>

      <div className={`fortune-card fortune-${fortune} ${isReceived || isThrownAway ? 'completed' : ''}`}>
        <div className="fortune-header">
          {fortune === 'shang' && t('step3.result.shang')}
          {fortune === 'zhong' && t('step3.result.zhong')}
          {/* 下签时不显示签类型 */}
        </div>
        
        <div className="fortune-content">
          {fortune === 'shang' && (
            <div className="fortune-message">
              {!isReceived ? (
                <>
                  <div 
                    className={`affirmation ${isFav ? 'favorited' : ''} ${isFavorited ? 'favorited-animation' : ''}`}
                    onClick={handleFavorite}
                    style={{ cursor: 'pointer' }}
                    title={isFav ? t('button.remove') : t('button.favorite')}
                  >
                    <span>{affirmation}</span>
                    <span className="favorite-icon">
                      {isFav ? '★' : '☆'}
                    </span>
                  </div>
                  <div className="message-text">{t('step3.shang.message')}</div>
                  <div className="blessing-icon"></div>
                </>
              ) : (
                <div className="blessing-message">
                  <div className="blessing-text">
                    {language === 'zh' ? '愿您心想事成，好运连连！' : 'May all your wishes come true!'}
                  </div>
                </div>
              )}
            </div>
          )}

          {fortune === 'zhong' && (
            <div className="fortune-message">
              <div 
                className={`affirmation ${isFav ? 'favorited' : ''} ${isFavorited ? 'favorited-animation' : ''}`}
                onClick={handleFavorite}
                style={{ cursor: 'pointer' }}
                title={isFav ? t('button.remove') : t('button.favorite')}
              >
                <span>{affirmation}</span>
                <span className="favorite-icon">
                  {isFav ? '★' : '☆'}
                </span>
              </div>
              <div className="message-text">{t('step3.zhong.message')}</div>
              <div className="retry-icon"></div>
            </div>
          )}

          {fortune === 'xia' && (
            <div className="fortune-message">
              {!isThrownAway ? (
                <>
                  <div 
                    className={`affirmation ${isFav ? 'favorited' : ''} ${isFavorited ? 'favorited-animation' : ''}`}
                    onClick={handleFavorite}
                    style={{ cursor: 'pointer' }}
                    title={isFav ? t('button.remove') : t('button.favorite')}
                  >
                    <span>{affirmation}</span>
                    <span className="favorite-icon">
                      {isFav ? '★' : '☆'}
                    </span>
                  </div>
                  <div className="message-text">{t('step3.xia.message')}</div>
                  <div className="trash-container">
                    <button 
                      className="trash-button"
                      onClick={handleThrowAway}
                      aria-label={t('step3.throwAway')}
                    >
                      <div className="trash-icon"></div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="thrown-away">
                  <div className="trash-animation"></div>
                  <div className="thrown-text">
                    {language === 'zh' ? '杂念已清空，你的心已经准备好重新出发啦！' : 'Distractions cleared, your heart is ready to start anew!'}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="action-buttons">
        {fortune === 'shang' && !isReceived && (
          <button onClick={handleReceive} className="receive-button">
            {t('button.receive')}
          </button>
        )}
        
        {fortune === 'zhong' && (
          <button onClick={handleRetry} className="retry-button">
            {t('button.tryAgain')}
          </button>
        )}

        {(isReceived || isThrownAway) && (
          <button onClick={onRestart} className="restart-button">
            {t('button.retry')}
          </button>
        )}
      </div>
    </div>
  );
};
