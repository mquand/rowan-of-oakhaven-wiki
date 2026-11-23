'use client';

import { useState } from 'react';
import styles from './CharacterPortrait.module.scss';
import Icon from './Icon';

export default function CharacterPortrait({
  id,
  name = '',
  size = 48,
  className = '',
  frameless = false,
  fallbackIcon = 'user',
}) {
  const [imgError, setImgError] = useState(false);

  if (!id) return null;

  const slug = id.replace(/^(npc_|pet_)/, '');
  const imageSrc = `/images/characters/${id}.png`;

  const boxClasses = [
    styles.portraitBox,
    frameless ? styles.frameless : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={boxClasses}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-label={name || slug}
      title={name || slug}
    >
      {!imgError ? (
        <img
          src={imageSrc}
          alt={name || slug}
          width={size}
          height={size}
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            imageRendering: 'pixelated',
          }}
        />
      ) : (
        <Icon name={fallbackIcon || 'user'} size={Math.round(size * 0.55)} />
      )}
    </div>
  );
}
