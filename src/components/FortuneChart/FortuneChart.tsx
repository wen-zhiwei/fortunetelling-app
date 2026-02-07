import React from 'react';
import { getFortuneStatistics, TimeRange } from '../../utils/history';
import { useLanguage } from '../../contexts/LanguageContext';
import './FortuneChart.css';

interface FortuneChartProps {
  timeRange: TimeRange;
}

export const FortuneChart: React.FC<FortuneChartProps> = ({ timeRange }) => {
  const { t } = useLanguage();
  const stats = getFortuneStatistics(timeRange);

  // 计算上签百分比
  const getShangPercentage = (): number => {
    if (stats.total === 0) return 0;
    return Math.round((stats.shang / stats.total) * 100);
  };

  // 计算饼图角度
  const getShangAngle = (): number => {
    return (getShangPercentage() / 100) * 360;
  };

  return (
    <div className="fortune-chart">
      <h3>{t('history.chart.title')}</h3>
      
      <div className="chart-content">
        <div className="chart-pie">
          <div className="pie-container">
            <div className="pie-chart">
              <div className="pie-background"></div>
              {getShangAngle() > 0 && getShangAngle() < 360 && (
                <div 
                  className="pie-slice shang" 
                  style={{ 
                    transform: `rotate(-90deg) rotate(${getShangAngle()}deg)`
                  }}
                ></div>
              )}
              {getShangAngle() === 100 && (
                <div className="pie-slice shang full"></div>
              )}
            </div>
            <div className="pie-center">
              <div className="pie-percentage">{getShangPercentage()}%</div>
              <div className="pie-label">{t('step3.result.shang')}</div>
            </div>
          </div>
        </div>

        <div className="chart-summary">
          <div className="summary-item">
            <span className="summary-label">{t('history.chart.total')}:</span>
            <span className="summary-value">{stats.total}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">{t('step3.result.shang')}:</span>
            <span className="summary-value">{stats.shang}</span>
          </div>
        </div>
      </div>

      {stats.total === 0 && (
        <div className="chart-empty">
          {t('history.chart.empty')}
        </div>
      )}
    </div>
  );
};
