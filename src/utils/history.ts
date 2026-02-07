// 历史记录管理工具
import { FortuneType } from './fortune';

export interface FortuneRecord {
  id: string;
  timestamp: number;
  fortune: FortuneType;
}

export type TimeRange = '3d' | '7d' | '1m' | '3m' | '6m' | '1y';

const STORAGE_KEY = 'fortune_history';

/**
 * 获取指定时间范围内的毫秒数
 */
const getTimeRangeMs = (range: TimeRange): number => {
  const now = Date.now();
  switch (range) {
    case '3d':
      return now - 3 * 24 * 60 * 60 * 1000;
    case '7d':
      return now - 7 * 24 * 60 * 60 * 1000;
    case '1m':
      return now - 30 * 24 * 60 * 60 * 1000;
    case '3m':
      return now - 90 * 24 * 60 * 60 * 1000;
    case '6m':
      return now - 180 * 24 * 60 * 60 * 1000;
    case '1y':
      return now - 365 * 24 * 60 * 60 * 1000;
    default:
      return now - 7 * 24 * 60 * 60 * 1000;
  }
};

/**
 * 添加新的求签记录
 */
export const addFortuneRecord = (fortune: FortuneType): FortuneRecord => {
  const records = getFortuneRecords();
  const newRecord: FortuneRecord = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
    fortune,
  };
  
  records.push(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return newRecord;
};

/**
 * 获取所有求签记录
 */
export const getFortuneRecords = (): FortuneRecord[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading fortune history:', error);
    return [];
  }
};

/**
 * 获取指定时间范围内的求签记录
 */
export const getFortuneRecordsByTimeRange = (range: TimeRange): FortuneRecord[] => {
  const records = getFortuneRecords();
  const startTime = getTimeRangeMs(range);
  return records.filter(record => record.timestamp >= startTime);
};

/**
 * 统计指定时间范围内的签文分布
 */
export const getFortuneStatistics = (range: TimeRange) => {
  const records = getFortuneRecordsByTimeRange(range);
  const stats = {
    total: records.length,
    shang: 0,
    zhong: 0,
    xia: 0,
  };
  
  records.forEach(record => {
    stats[record.fortune]++;
  });
  
  return stats;
};

/**
 * 清空所有求签记录
 */
export const clearFortuneRecords = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
