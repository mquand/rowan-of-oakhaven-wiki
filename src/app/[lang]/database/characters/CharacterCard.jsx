'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '../../../../components/Icon';
import CharacterPortrait from '../../../../components/CharacterPortrait';
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
          <CharacterPortrait
            id={char.id}
            name={char.name}
            size={52}
            frameless
            fallbackIcon={iconName}
          />
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

      {/* Multi-Tier Heart Events Timeline */}
      {char.heart_events && char.heart_events.length > 0 ? (
        <div className={styles.heartMilestoneBox}>
          <div 
            className={styles.heartMilestoneHeader} 
            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            onClick={() => setShowHeartSpoiler(prev => !prev)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="heart" size={12} />
              <span>{isEn ? `Heart Events (${char.heart_events.length} Milestones)` : `Tuyến Sự Kiện Trái Tim (${char.heart_events.length} Mốc)`}</span>
            </div>
            <span style={{ fontSize: '11px', textTransform: 'none', color: '#ffcf40', cursor: 'pointer' }}>
              {showHeartSpoiler ? (isEn ? '▲ Hide' : '▲ Thu gọn') : (isEn ? '▼ View All' : '▼ Xem chi tiết')}
            </span>
          </div>

          {!showHeartSpoiler && char.heart_event_summary && (
            <p className={styles.heartMilestoneText}>{char.heart_event_summary}</p>
          )}

          {showHeartSpoiler && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {char.heart_events.map((evt, idx) => (
                <div key={`${char.id}-evt-${idx}`} style={{ padding: '6px 8px', background: 'rgba(0,0,0,0.25)', borderRadius: '4px', borderLeft: '2px solid #ffd043' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#ff6b81', fontWeight: 'bold', fontSize: '11px' }}>{evt.level} ❤️</span>
                      <strong style={{ fontSize: '12px', color: '#ffd043' }}>{evt.title}</strong>
                    </div>
                    {evt.event_type && (
                      <span style={{ fontSize: '10px', padding: '1px 5px', borderRadius: '3px', background: evt.event_type === 'cutscene' ? 'rgba(235, 77, 75, 0.2)' : evt.event_type === 'tavern_dialogue' ? 'rgba(240, 147, 43, 0.2)' : 'rgba(106, 176, 76, 0.2)', color: evt.event_type === 'cutscene' ? '#ff7979' : evt.event_type === 'tavern_dialogue' ? '#f6e58d' : '#badc58', border: '1px solid currentColor' }}>
                        {evt.event_type === 'cutscene' ? (isEn ? '🎬 Cutscene' : '🎬 Hoạt cảnh') : evt.event_type === 'tavern_dialogue' ? (isEn ? '🍲 Hearth Chat' : '🍲 Bàn ăn') : (isEn ? '📬 Morning Mail' : '📬 Thư tay')}
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#e0e0e0', lineHeight: '1.4' }}>{evt.description}</p>
                  <div style={{ fontSize: '11px', color: '#7bed9f' }}>
                    <strong>{isEn ? 'Reward:' : 'Phần thưởng:'}</strong> {evt.reward_unlock}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : char.heart_event_summary ? (
        <div className={styles.heartMilestoneBox}>
          <div className={styles.heartMilestoneHeader}>
            <Icon name="sparkle" size={12} />
            <span>{isEn ? '8-Heart Milestone Reward' : 'Phần Thưởng Hàn Gắn 8 Tim'}</span>
          </div>
          <p className={styles.heartMilestoneText}>{char.heart_event_summary}</p>
        </div>
      ) : null}

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
