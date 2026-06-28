import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number; // duration in ms
  suffix?: string;
  prefix?: string;
  decimals?: number;
  id?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1500,
  suffix = '',
  prefix = '',
  decimals = 0,
  id,
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function - easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentVal = easedProgress * value;
      
      setCount(currentVal);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, duration]);

  const formatted = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span id={id} className="font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-teal-400">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
