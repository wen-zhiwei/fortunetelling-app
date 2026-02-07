// 签文概率分布逻辑
export type FortuneType = 'shang' | 'zhong' | 'xia';

/**
 * 根据概率分布抽取签文
 * 上签: 32.1%
 * 中签: 32.1%
 * 下签: 35.8%
 */
export const drawFortune = (): FortuneType => {
  const random = Math.random() * 100;
  
  if (random < 32.1) {
    return 'shang'; // 上签
  } else if (random < 64.2) {
    return 'zhong'; // 中签
  } else {
    return 'xia'; // 下签
  }
};

/**
 * 获取签文的中文名称
 */
export const getFortuneName = (type: FortuneType, lang: 'zh' | 'en'): string => {
  if (lang === 'zh') {
    switch (type) {
      case 'shang':
        return '上签';
      case 'zhong':
        return '中签';
      case 'xia':
        return '下签';
    }
  } else {
    switch (type) {
      case 'shang':
        return 'Upper Fortune';
      case 'zhong':
        return 'Middle Fortune';
      case 'xia':
        return 'Lower Fortune';
    }
  }
};
