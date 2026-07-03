'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function LuxuryCursor() {
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring physics for cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Walk up the DOM tree to find data-cursor attribute
      const cursorTarget = target.closest('[data-cursor]');
      
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor');
        setHoverText(text || '');
      } else {
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor globally
    document.documentElement.classList.add('hide-cursor');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.classList.remove('hide-cursor');
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const isHovering = hoverText !== '';

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 64 : 12,
            height: isHovering ? 64 : 12,
            backgroundColor: isHovering ? 'transparent' : 'var(--text)',
            border: isHovering ? '1px solid var(--text)' : '1px solid transparent',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="rounded-full flex items-center justify-center"
        >
          {isHovering && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[7px] font-sans tracking-[0.4em] uppercase text-[var(--text)]"
            >
              {hoverText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
