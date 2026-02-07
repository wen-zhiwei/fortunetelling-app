import { Affirmation } from './affirmations';

const FAVORITES_KEY = 'fortune_affirmation_favorites';

export interface FavoriteAffirmation extends Affirmation {
  id: string;
  addedAt: number;
}

export const getFavorites = (): FavoriteAffirmation[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addFavorite = (affirmation: Affirmation): boolean => {
  try {
    const favorites = getFavorites();
    
    // 检查是否已经收藏过
    const isDuplicate = favorites.some(fav => 
      fav.zh === affirmation.zh && fav.en === affirmation.en
    );
    
    if (isDuplicate) {
      return false; // 已经收藏过
    }
    
    const newFavorite: FavoriteAffirmation = {
      ...affirmation,
      id: Date.now().toString(),
      addedAt: Date.now()
    };
    
    favorites.push(newFavorite);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true; // 收藏成功
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
};

export const removeFavorite = (id: string): boolean => {
  try {
    const favorites = getFavorites();
    const filteredFavorites = favorites.filter(fav => fav.id !== id);
    
    if (filteredFavorites.length === favorites.length) {
      return false; // 没有找到要删除的收藏
    }
    
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filteredFavorites));
    return true; // 删除成功
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
};

export const isFavorite = (affirmation: Affirmation): boolean => {
  try {
    const favorites = getFavorites();
    return favorites.some(fav => 
      fav.zh === affirmation.zh && fav.en === affirmation.en
    );
  } catch (error) {
    console.error('Error checking if favorite:', error);
    return false;
  }
};
