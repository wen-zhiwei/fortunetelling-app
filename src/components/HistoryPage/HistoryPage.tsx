import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getFortuneRecordsByTimeRange, TimeRange, clearFortuneRecords } from '../../utils/history';
import { FortuneType } from '../../utils/fortune';
import './HistoryPage.css';
import { FortuneChart } from '../FortuneChart/FortuneChart';

interface HistoryPageProps {
  onBack: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onBack }) => {
  const { t, language } = useLanguage();
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [filter, setFilter] = useState<FortuneType | 'all'>('all');
  const [allRecords, setAllRecords] = useState(() => getFortuneRecordsByTimeRange(timeRange));
  const [filteredRecords, setFilteredRecords] = useState(allRecords);

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };

  const handleFilterChange = (newFilter: FortuneType | 'all') => {
    setFilter(newFilter);
  };

  const handleClearHistory = () => {
    if (window.confirm(t('history.confirmClear'))) {
      clearFortuneRecords();
      setAllRecords([]);
      setFilteredRecords([]);
    }
  };

  // 当时间范围或筛选条件变化时更新记录
  useEffect(() => {
    let records = getFortuneRecordsByTimeRange(timeRange);
    // 按时间倒序排序，最近的在前
    records.sort((a, b) => b.timestamp - a.timestamp);
    setAllRecords(records);
    
    if (filter === 'all') {
      setFilteredRecords(records);
    } else {
      const filtered = records.filter(record => record.fortune === filter);
      setFilteredRecords(filtered);
    }
  }, [timeRange, filter]);

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    if (language === 'zh') {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    } else {
      return date.toLocaleString('en-US');
    }
  };

  const getFortuneName = (fortune: FortuneType): string => {
    switch (fortune) {
      case 'shang':
        return t('step3.result.shang');
      case 'zhong':
        return t('step3.result.zhong');
      case 'xia':
        return t('step3.result.xia');
      default:
        return fortune;
    }
  };

  return (
    <div className="history-page pixel-container">
      <div className="history-header">
        <button className="back-button" onClick={onBack}>
          ×
        </button>
      </div>

      <div className="time-range-selector">
        <button 
          className={`range-button ${timeRange === '3d' ? 'active' : ''}`}
          onClick={() => handleTimeRangeChange('3d')}
        >
          {t('history.range.3d')}
        </button>
        <button 
          className={`range-button ${timeRange === '7d' ? 'active' : ''}`}
          onClick={() => handleTimeRangeChange('7d')}
        >
          {t('history.range.7d')}
        </button>
        <button 
          className={`range-button ${timeRange === '1m' ? 'active' : ''}`}
          onClick={() => handleTimeRangeChange('1m')}
        >
          {t('history.range.1m')}
        </button>
        <button 
          className={`range-button ${timeRange === '6m' ? 'active' : ''}`}
          onClick={() => handleTimeRangeChange('6m')}
        >
          {t('history.range.6m')}
        </button>
        <button 
          className={`range-button ${timeRange === '1y' ? 'active' : ''}`}
          onClick={() => handleTimeRangeChange('1y')}
        >
          {t('history.range.1y')}
        </button>
      </div>

      <div className="chart-container">
        <FortuneChart timeRange={timeRange} />
      </div>

      <div className="history-records">
        <div className="filter-container">
          <select 
            className="filter-select"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value as FortuneType | 'all')}
          >
            <option value="all">{t('history.filter.all')}</option>
            <option value="shang">{t('step3.result.shang')}</option>
            <option value="zhong">{t('step3.result.zhong')}</option>
            <option value="xia">{t('step3.result.xia')}</option>
          </select>
        </div>
        {filteredRecords.length === 0 ? (
          <div className="no-records">
            {filter === 'all' ? t('history.noRecords') : t('history.noFilteredRecords')}
          </div>
        ) : (
          <div className="records-list">
            {filteredRecords.map((record) => (
              <div key={record.id} className={`record-item fortune-${record.fortune}`}>
                <div className="record-time">{formatDate(record.timestamp)}</div>
                <div className="record-fortune">{getFortuneName(record.fortune)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {allRecords.length > 0 && (
        <button className="clear-history-button" onClick={handleClearHistory}>
          {t('history.clear')}
        </button>
      )}
    </div>
  );
};
