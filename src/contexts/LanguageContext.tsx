import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 翻译数据
const translations: Record<Language, Record<string, string>> = {
  zh: {
    // 通用
    'app.title': '好运阁',
    'button.throw': '投掷',
    'button.retry': '重新开始',
    'button.receive': '领取好运',
    'button.tryAgain': '再来一次',
    'button.back': '返回',
    'button.exit': '退出',
    'button.favorite': '收藏',
    'button.remove': '删除',   // 第一步：掷杯筊
    'step1.title': '第一步：掷杯筊',
    'step1.instruction': '点击投掷杯筊',
    'step1.attempts': '剩余次数',
    'step1.result.sheng': '圣杯',
    'step1.result.xiao': '笑杯',
    'step1.result.yin': '阴杯',
    'step1.result.sheng.desc': '心意契合，方向明确',
    'step1.result.xiao.desc': '梳理思路，重新投掷',
    'step1.result.yin.desc': '时机未到，稍作停顿',
    'step1.noAttempts': '次数用尽，请重新开始',
    'step1.human.title': '请掷杯筊请示',
    'step1.human.instruction': '梳理心中所想，确认前行方向',
    'step1.human.attempts': '剩余机会',
    
    // 第二步：摇签
    'step2.title': '第二步：摇签求签',
    'step2.instruction': '双手握住手机摇动',
    'step2.shaking': '摇动中...',
    'step2.result': '签文结果',
    'step2.human.title': '虔诚抽签',
    'step2.human.instruction': '',
    'step2.human.processing': '抽签中...',
    'step2.human.draw': '点击抽签',
    'step2.human.shang': '上',
    'step2.human.zhong': '中',
    'step2.human.xia': '下',
    
    // 第三步：领取签
    'step3.title': '第三步：领取签',
    'step3.result.shang': '上签',
    'step3.result.zhong': '中签',
    'step3.result.xia': '下签',
    'step3.shang.message': '把这份笃定藏在心里，勇敢前行吧！',
    'step3.zhong.message': '当下正是蓄力的好时机！',
    'step3.xia.message': '放下当下的烦恼，把纠结焦虑的情绪扔进垃圾桶',
    'step3.throwAway': '扔进垃圾桶',
    'step3.human.title': '内心的指引',
    
    // 设置
    'settings.language': '语言',
    'settings.theme': '主题',
    'settings.theme.purple': '紫色',
    'settings.theme.gold': '金色',
    'settings.theme.green': '绿色',
    'settings.favorites': '我的收藏',
    'settings.history': '历史记录',
    
    // 历史记录
    'history.title': '历史记录',
    'history.records': '求签记录',
    'history.noRecords': '暂无求签记录',
    'history.noFilteredRecords': '没有符合条件的记录',
    'history.filter.all': '全部',
    'history.clear': '清空记录',
    'history.confirmClear': '确定要清空所有求签记录吗？',
    'history.range.3d': '最近三天',
    'history.range.7d': '最近七天',
    'history.range.1m': '最近一月',
    'history.range.6m': '最近半年',
    'history.range.1y': '最近一年',
    'history.chart.title': '签文分布统计',
    'history.chart.total': '总次数',
    
    // 收藏
    'favorites.empty': '暂无收藏',
    'favorites.emptyHint': '点击五角星（☆）即可收藏喜欢的签文',
  },
  en: {
    // Common
    'app.title': 'Lucky Hub',
    'button.throw': 'Throw',
    'button.retry': 'Restart',
    'button.receive': 'Claim Your Fortune',
    'button.tryAgain': 'Try Again',
    'button.back': 'Back',
    'button.exit': 'Exit',
    'button.favorite': 'Favorite',

    'step1.title': 'Step 1: Throw Cups',
    'step1.instruction': 'Click to throw the cups',
    'step1.attempts': 'Attempts Left',
    'step1.result.sheng': 'Sheng Cup',
    'step1.result.xiao': 'Xiao Cup',
    'step1.result.yin': 'Yin Cup',
    'step1.result.sheng.desc': 'Hearts aligned, direction clear',
    'step1.result.xiao.desc': 'Sort out your thoughts, throw again',
    'step1.result.yin.desc': 'The time is not right, pause briefly',
    'step1.noAttempts': 'No attempts left, please restart',
    'step1.human.title': 'Please throw the cups to consult',
    'step1.human.instruction': 'Sort out your thoughts and confirm your path forward',
    'step1.human.attempts': 'Remaining chances',
    
    // Step 2: Shake
    'step2.title': 'Step 2: Shake for Fortune',
    'step2.instruction': 'Hold phone with both hands and shake',
    'step2.shaking': 'Shaking...',
    'step2.result': 'Fortune Result',
    'step2.human.title': 'Devoutly draw lots',
    'step2.human.instruction': '',
    'step2.human.processing': 'Drawing lots...',
    'step2.human.draw': 'Click to draw lots',
    'step2.human.shang': 'U',
    'step2.human.zhong': 'M',
    'step2.human.xia': 'L',
    
    // Step 3: Receive
    'step3.title': 'Step 3: Receive Fortune',
    'step3.result.shang': 'Upper Fortune',
    'step3.result.zhong': 'Middle Fortune',
    'step3.result.xia': 'Lower Fortune',
    'step3.shang.message': 'Keep this certainty in your heart and move forward bravely!',
    'step3.zhong.message': 'Now is the perfect time to gather strength!',
    'step3.xia.message': 'Let go of current troubles, throw your tangled and anxious emotions into the trash',
    'step3.throwAway': 'Discard Bad Luck',
    'step3.human.title': 'Inner Guidance',
    
    // Settings
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.theme.purple': 'Purple',
    'settings.theme.gold': 'Gold',
    'settings.theme.green': 'Green',
    'settings.favorites': 'My Favorites',
    'settings.history': 'History',
    
    // History
    'history.title': 'History',
    'history.records': 'Fortune Records',
    'history.noRecords': 'No fortune records yet',
    'history.noFilteredRecords': 'No matching records',
    'history.filter.all': 'All',
    'history.clear': 'Clear Records',
    'history.confirmClear': 'Are you sure you want to clear all fortune records?',
    'history.range.3d': 'Last 3 days',
    'history.range.7d': 'Last 7 days',
    'history.range.1m': 'Last month',
    'history.range.6m': 'Last 6 months',
    'history.range.1y': 'Last year',
    'history.chart.title': 'Fortune Distribution',
    'history.chart.total': 'Total',
    
    // Favorites
    'favorites.empty': 'No favorites yet',
    'favorites.emptyHint': 'Click on the star (☆) to save your favorite fortunes',
    'button.remove': 'Remove',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'zh' || saved === 'en') ? saved : 'zh';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const value = translations[language][key];
    return value !== undefined ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
