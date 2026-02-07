import { useEffect, useRef, useState } from 'react';

interface UseShakeOptions {
  threshold?: number; // 摇动阈值
  timeout?: number; // 防抖时间（毫秒）
  onShake?: () => void; // 摇动回调
}

interface DeviceMotionEvent extends Event {
  acceleration: {
    x: number | null;
    y: number | null;
    z: number | null;
  };
  accelerationIncludingGravity: {
    x: number | null;
    y: number | null;
    z: number | null;
  };
}

export const useShake = (options: UseShakeOptions = {}) => {
  const {
    threshold = 15, // 默认阈值
    timeout = 1000, // 默认1秒防抖
    onShake,
  } = options;

  const [isShaking, setIsShaking] = useState(false);
  const [hasShaken, setHasShaken] = useState(false);
  const lastShakeTime = useRef<number>(0);
  const lastAcceleration = useRef<{ x: number; y: number; z: number } | null>(null);
  const shakeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // 检查是否支持DeviceMotion API
    if (typeof window === 'undefined' || !window.DeviceMotionEvent) {
      console.warn('DeviceMotion API is not supported');
      return;
    }

    const handleDeviceMotion = (event: Event) => {
      const motionEvent = event as unknown as DeviceMotionEvent;
      const acceleration = motionEvent.accelerationIncludingGravity;

      if (
        acceleration.x === null ||
        acceleration.y === null ||
        acceleration.z === null
      ) {
        return;
      }

      const currentTime = Date.now();

      // 计算加速度变化
      if (lastAcceleration.current) {
        const deltaX = Math.abs(acceleration.x - lastAcceleration.current.x);
        const deltaY = Math.abs(acceleration.y - lastAcceleration.current.y);
        const deltaZ = Math.abs(acceleration.z - lastAcceleration.current.z);

        const totalDelta = deltaX + deltaY + deltaZ;

        // 如果变化超过阈值，认为是摇动
        if (totalDelta > threshold) {
          // 防抖处理
          if (currentTime - lastShakeTime.current > timeout) {
            setIsShaking(true);
            setHasShaken(true);
            lastShakeTime.current = currentTime;

            // 清除之前的超时
            if (shakeTimeoutRef.current) {
              clearTimeout(shakeTimeoutRef.current);
            }

            // 设置停止摇动的超时
            shakeTimeoutRef.current = window.setTimeout(() => {
              setIsShaking(false);
            }, 500);

            // 触发回调
            if (onShake) {
              onShake();
            }
          }
        }
      }

      // 更新上次的加速度值
      lastAcceleration.current = {
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z,
      };
    };

    // 请求权限（iOS 13+需要）
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      (DeviceMotionEvent as any)
        .requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleDeviceMotion);
          } else {
            console.warn('DeviceMotion permission denied');
          }
        })
        .catch((error: Error) => {
          console.error('Error requesting DeviceMotion permission:', error);
        });
    } else {
      // Android和其他浏览器直接监听
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
      if (shakeTimeoutRef.current) {
        clearTimeout(shakeTimeoutRef.current);
      }
    };
  }, [threshold, timeout, onShake]);

  const reset = () => {
    setHasShaken(false);
    setIsShaking(false);
    lastShakeTime.current = 0;
    lastAcceleration.current = null;
  };

  return {
    isShaking,
    hasShaken,
    reset,
  };
};
