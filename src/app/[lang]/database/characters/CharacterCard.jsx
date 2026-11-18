'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '../../../../components/Icon';
import styles from '../Database.module.scss';
import { lookupGift } from '../../../../lib/itemLookup';

export default function CharacterCard({ char, lang, iconName, dict, isEn }) {
  const [scheduleTab, setScheduleTab] = useState('sunny');
  const [showHeartSpoiler, setShowHeartSpoiler] = useState(false);

  const favoriteItems = (char.favorite_items || []).map(id => lookupGift(id, lang));
  const giftPrefs = char.gift_preferences;
  const lovedItems = giftPrefs ? (giftPrefs.loved || []).map(id => lookupGift(id, lang)) : [];
  const likedItems = giftPrefs ? (giftPrefs.liked || []).map(id => lookupGift(id, lang)) : [];
  const hatedItems = giftPrefs ? (giftPrefs.hated || []).map(id => lookupGift(id, lang)) : [];

  const schedules = char.schedules;
  const currentTimeline = schedules?.default ? (schedules.default[scheduleTab] || schedules.default.sunny || []) : [];

  return (
    <article className={`${styles.characterCard} pixel-frame`}>
      <div className={styles.cardTop}>
        <div className={styles.avatarSlot}>
          <Icon name={iconName} size={30} />
        </div>
        <div className={styles.cardIdentity}>
          <h2 className={styles.charName}>{char.name}</h2>
          <div className={styles.charRole}>{char.role}</div>
          <div className={styles.charMetaRow}>
            <span className="badge forest">{char.species}</span>
            <span className={styles.locationTag}>
              <Icon name="map-pin" size={12} /> {char.location}
            </span>
            {char.birthday && (
              <span className={styles.locationTag} style={{ color: '#ffcf40' }}>
                <Icon name="clock" size={12} /> {char.birthday}
              </span>
            )}
          </div>
        </div>
      </div>

      {char.quote && (
        <div className={styles.quoteBubble}>
          &ldquo;{char.quote}&rdquo;
        </div>
      )}

      {/* Real-World Trauma Box */}
      {char.real_world_wound && (
        <div className={styles.traumaBox}>
          <div className={styles.traumaHeader}>
            <Icon name="heart" size={12} />
            <span>{isEn ? 'Inner Wound & Conflict' : 'Vết nứt tâm lý & Mâu thuẫn'}</span>
          </div>
          <p className={styles.traumaText}>{char.real_world_wound}</p>
        </div>
      )}

      {/* Heart Event Summary */}
      {char.heart_event_summary && (
        <div className={styles.heartMilestoneBox}>
          <div className={styles.heartMilestoneHeader}>
            <Icon name="sparkle" size={12} />
            <span>{isEn ? '8-Heart Milestone Reward' : 'Phần Thưởng Hàn Gắn 8 Tim'}</span>
          </div>
          <p className={styles.heartMilestoneText}>{char.heart_event_summary}</p>
        </div>
      )}

      <p className={styles.charBio}>{char.description}</p>

      {/* Multi-weather Dynamic Schedule Tabs */}
      {schedules && (
        <div className={styles.scheduleTabsSection}>
          <div className={styles.scheduleHeader}>
            <Icon name="clock" size={12} />
            <span>{isEn ? 'Daily Routine & Weather Matrix' : 'Lịch Trình Di Chuyển Theo Thời Tiết'}</span>
          </div>
          <div className={styles.scheduleTabs}>
            <button
              type="button"
              className={`${styles.scheduleTabBtn} ${scheduleTab === 'sunny' ? styles.activeTab : ''}`}
              onClick={() => setScheduleTab('sunny')}
            >
              ☀️ {isEn ? 'Sunny Days' : 'Ngày Nắng'}
            </button>
            <button
              type="button"
              className={`${styles.scheduleTabBtn} ${scheduleTab === 'rainy' ? styles.activeTab : ''}`}
              onClick={() => setScheduleTab('rainy')}
            >
              🌧️ {isEn ? 'Rainy Days' : 'Ngày Mưa'}
            </button>
          </div>
          <div className={styles.scheduleTimeline}>
            {currentTimeline.length > 0 ? (
              currentTimeline.map((item, idx) => (
                <div key={`${char.id}-sched-${idx}`} className={styles.timelineRow}>
                  <span className={styles.timelineTime}>{item.time}</span>
                  <span className={styles.timelineContent}>
                    <strong className={styles.timelineLocation}>[{item.location}]</strong>
                    {item.activity}
                  </span>
                </div>
              ))
            ) : (
              <span style={{ fontSize: '11px', color: '#8b949e' }}>
                {isEn ? 'Follows general schedule' : 'Theo lịch trình sinh hoạt chung'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Gift Preferences Tiers */}
      {giftPrefs ? (
        <div className={styles.giftTiersSection}>
          <div className={styles.giftsLabel}>
            <Icon name="heart" size={13} />
            <span>{isEn ? 'Gift Preferences' : 'Sở thích quà tặng'}</span>
          </div>
          {lovedItems.length > 0 && (
            <div className={styles.giftTierRow}>
              <span className={`${styles.giftTierLabel} ${styles.tierLoved}`}>
                ❤️ {isEn ? 'Loved (Signature & Comfort):' : 'Đặc biệt yêu thích:'}
              </span>
              <div className={styles.giftsList}>
                {lovedItems.map((gift, idx) => (
                  <Link key={`${char.id}-loved-${idx}`} href={gift.href} className={styles.giftBadgeLink}>
                    <Icon name={gift.icon} size={12} />
                    <span>{gift.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {likedItems.length > 0 && (
            <div className={styles.giftTierRow}>
              <span className={`${styles.giftTierLabel} ${styles.tierLiked}`}>
                👍 {isEn ? 'Liked:' : 'Thích:'}
              </span>
              <div className={styles.giftsList}>
                {likedItems.map((gift, idx) => (
                  <Link key={`${char.id}-liked-${idx}`} href={gift.href} className={styles.giftBadgeLink}>
                    <Icon name={gift.icon} size={12} />
                    <span>{gift.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {hatedItems.length > 0 && (
            <div className={styles.giftTierRow}>
              <span className={`${styles.giftTierLabel} ${styles.tierHated}`}>
                ❌ {isEn ? 'Hated:' : 'Ghét / Dị ứng:'}
              </span>
              <div className={styles.giftsList}>
                {hatedItems.map((gift, idx) => (
                  <Link key={`${char.id}-hated-${idx}`} href={gift.href} className={styles.giftBadgeLink} style={{ opacity: 0.7 }}>
                    <Icon name={gift.icon} size={12} />
                    <span>{gift.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.giftsSection}>
          <div className={styles.giftsLabel}>
            <Icon name="heart" size={13} />
            <span>{dict.database.browser.favoriteGifts}</span>
          </div>
          <div className={styles.giftsList}>
            {favoriteItems.length > 0 ? (
              favoriteItems.map((gift, idx) => (
                <Link
                  key={`${char.id}-gift-${idx}`}
                  href={gift.href}
                  className={styles.giftBadgeLink}
                >
                  <Icon name={gift.icon} size={13} />
                  <span>{gift.name}</span>
                </Link>
              ))
            ) : (
              <span style={{ fontSize: '12px', color: '#8d92aa' }}>{isEn ? 'Discovering...' : 'Đang tìm hiểu...'}</span>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
