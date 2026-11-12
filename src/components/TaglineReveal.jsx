'use client';

import { useEffect, useRef } from 'react';
import styles from './TaglineReveal.module.scss';

export default function TaglineReveal({ text, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      el.classList.add(styles.active);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.active);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <p ref={ref} className={`${styles.tagline} ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i}>
          <span className={styles.word} style={{ '--i': i }} aria-hidden="true">
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
