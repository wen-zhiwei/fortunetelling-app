import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getFavorites, removeFavorite, FavoriteAffirmation } from '../../utils/favorites';
import './FavoritesPage.css';

interface FavoritesPageProps {
  onBack: () => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onBack }) => {
  const { t, language } = useLanguage();
  const [favorites, setFavorites] = React.useState<FavoriteAffirmation[]>([]);

  React.useEffect(() => {
    // 加载收藏的肯定语
    const loadedFavorites = getFavorites();
    setFavorites(loadedFavorites);
  }, []);

  const handleRemoveFavorite = (id: string) => {
    // 从本地存储中删除
    const success = removeFavorite(id);
    if (success) {
      // 更新状态
      setFavorites(prev => prev.filter(fav => fav.id !== id));
    }
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    if (language === 'zh') {
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    } else {
      return date.toLocaleDateString('en-US');
    }
  };

  return (
    <div className="favorites-page pixel-container">
      <button className="back-button" onClick={onBack}>
        ×
      </button>
      
      <h2>{t('settings.favorites')}</h2>
      
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>{t('favorites.empty')}</p>
          <p className="empty-hint">{t('favorites.emptyHint')}</p>
        </div>
      ) : (
        <div className="favorites-list">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-item">
              <div className="favorite-content">
                <div className="favorite-text">
                  {language === 'zh' ? favorite.zh : favorite.en}
                </div>
                <div className="favorite-date">
                  {formatDate(favorite.addedAt)}
                </div>
              </div>
              <button 
                className="remove-button"
                onClick={() => handleRemoveFavorite(favorite.id)}
                aria-label={t('button.remove')}
              >
                ★
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
