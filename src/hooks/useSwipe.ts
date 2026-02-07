import { useEffect, useRef, useState } from 'react';

interface UseSwipeOptions {
  threshold?: number; // 滑动距离阈值
  timeout?: number; // 防抖时间（毫秒）
  onSwipe?: () => void; // 滑动回调
}

export const useSwipe = (options: UseSwipeOptions = {}) => {
  const {
    threshold = 100, // 默认阈值
    timeout = 1000, // 默认1秒防抖
    onSwipe,
  } = options;

  const [isSwiping, setIsSwiping] = useState(false);
  const [hasSwiped, setHasSwiped] = useState(false);
  const lastSwipeTime = useRef<number>(0);
  const startX = useRef<number>(0);
  const startTime = useRef<number>(0);
  const swipeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
      startTime.current = Date.now();
      setIsSwiping(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!startX.current) return;
      
      const currentX = e.touches[0].clientX;
      const deltaX = Math.abs(currentX - startX.current);
      const deltaTime = Date.now() - startTime.current;
      
      // 检查是否是快速滑动
      if (deltaX > threshold && deltaTime < 300) {
        const currentTime = Date.now();
        
        // 防抖处理
        if (currentTime - lastSwipeTime.current > timeout) {
          setHasSwiped(true);
          lastSwipeTime.current = currentTime;

          // 清除之前的超时
          if (swipeTimeoutRef.current) {
            clearTimeout(swipeTimeoutRef.current);
          }

          // 设置停止滑动的超时
          swipeTimeoutRef.current = window.setTimeout(() => {
            setIsSwiping(false);
          }, 500);

          // 触发回调
          if (onSwipe) {
            onSwipe();
          }
        }
      }
    };

    const handleTouchEnd = () => {
      setIsSwiping(false);
      startX.current = 0;
      startTime.current = 0;
    };

    // 添加触摸事件监听器
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      // 移除触摸事件监听器
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (swipeTimeoutRef.current) {
        clearTimeout(swipeTimeoutRef.current);
      }
    };
  }, [threshold, timeout, onSwipe]);

  const reset = () => {
    setHasSwiped(false);
    setIsSwiping(false);
    lastSwipeTime.current = 0;
    startX.current = 0;
    startTime.current = 0;
  };

  return {
    isSwiping,
    hasSwiped,
    reset,
  };
};