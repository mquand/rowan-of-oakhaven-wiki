import styles from './CharacterPortrait.module.scss';

export default function CharacterPortrait({ id, size = 48, className = '' }) {
  let content = null;

  if (id === 'rowan') {
    // Rowan: Phù thủy trẻ với mũ chóp tím đêm sao vàng & tóc hạt dẻ
    content = (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        {/* Tóc sau & mũ chóp */}
        <rect x="14" y="2" width="4" height="3" fill="#3b1b6e" />
        <rect x="13" y="5" width="6" height="3" fill="#4c2882" />
        <rect x="11" y="8" width="10" height="3" fill="#5b329c" />
        {/* Ngôi sao vàng trên mũ */}
        <rect x="15" y="6" width="2" height="2" fill="#ffe680" />
        {/* Vành mũ rộng */}
        <rect x="7" y="11" width="18" height="2" fill="#2d1354" />
        {/* Tóc hạt dẻ & khuôn mặt */}
        <rect x="9" y="13" width="4" height="8" fill="#854d0e" />
        <rect x="19" y="13" width="4" height="8" fill="#854d0e" />
        <rect x="12" y="13" width="8" height="3" fill="#854d0e" />
        {/* Da mặt */}
        <rect x="12" y="15" width="8" height="7" fill="#fed7aa" />
        {/* Mắt màu hổ phách */}
        <rect x="13" y="17" width="2" height="2" fill="#b45309" />
        <rect x="17" y="17" width="2" height="2" fill="#b45309" />
        <rect x="13" y="17" width="1" height="1" fill="#ffffff" />
        <rect x="17" y="17" width="1" height="1" fill="#ffffff" />
        {/* Má hồng & nụ cười */}
        <rect x="12" y="19" width="1" height="1" fill="#fca5a5" />
        <rect x="19" y="19" width="1" height="1" fill="#fca5a5" />
        <rect x="15" y="20" width="2" height="1" fill="#9a3412" />
        {/* Áo choàng phù thủy */}
        <rect x="10" y="23" width="12" height="7" fill="#1e1b4b" />
        <rect x="14" y="23" width="4" height="3" fill="#4338ca" />
        <rect x="15" y="24" width="2" height="2" fill="#ffe680" />
      </svg>
    );
  } else if (id === 'pip') {
    // Pip: Cú đưa thư đêm mắt to tròn, ngậm phong bì thư nhỏ
    content = (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        {/* Thân cú tròn lông nâu đốm */}
        <rect x="10" y="5" width="12" height="19" fill="#78350f" />
        <rect x="8" y="9" width="16" height="14" fill="#92400e" />
        {/* Lông ngực màu kem tuyết */}
        <rect x="12" y="14" width="8" height="9" fill="#fef3c7" />
        <rect x="14" y="16" width="4" height="6" fill="#fde68a" />
        {/* Mắt to tròn viền đen */}
        <rect x="9" y="8" width="6" height="6" fill="#1e293b" />
        <rect x="17" y="8" width="6" height="6" fill="#1e293b" />
        <rect x="10" y="9" width="4" height="4" fill="#fbbf24" />
        <rect x="18" y="9" width="4" height="4" fill="#fbbf24" />
        <rect x="11" y="10" width="2" height="2" fill="#000000" />
        <rect x="19" y="10" width="2" height="2" fill="#000000" />
        <rect x="11" y="10" width="1" height="1" fill="#ffffff" />
        <rect x="19" y="10" width="1" height="1" fill="#ffffff" />
        {/* Mỏ cam nhọn */}
        <rect x="15" y="13" width="2" height="2" fill="#ea580c" />
        {/* Phong thư nhỏ ngậm ở mỏ */}
        <rect x="13" y="15" width="6" height="4" fill="#ffffff" />
        <rect x="14" y="16" width="4" height="2" fill="#dc2626" />
        {/* Chân cú bám cành */}
        <rect x="11" y="24" width="3" height="3" fill="#d97706" />
        <rect x="18" y="24" width="3" height="3" fill="#d97706" />
      </svg>
    );
  } else if (id === 'mallow') {
    // Mallow: Mèo tam thể bếp bánh má hồng, đội mũ thợ bánh mì
    content = (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        {/* Mũ thợ làm bánh trắng bồng bềnh */}
        <rect x="12" y="3" width="10" height="4" fill="#f8fafc" />
        <rect x="10" y="5" width="14" height="3" fill="#ffffff" />
        <rect x="11" y="7" width="11" height="2" fill="#cbd5e1" />
        {/* Tai mèo tam thể */}
        <rect x="7" y="8" width="4" height="4" fill="#ea580c" />
        <rect x="8" y="9" width="2" height="2" fill="#fbcfe8" />
        <rect x="21" y="8" width="4" height="4" fill="#1e293b" />
        <rect x="22" y="9" width="2" height="2" fill="#fbcfe8" />
        {/* Đầu & mặt mèo tam thể */}
        <rect x="8" y="11" width="16" height="12" fill="#ffffff" />
        {/* Đốm cam bên má trái */}
        <rect x="8" y="11" width="5" height="5" fill="#ea580c" />
        {/* Mắt mèo xanh lá ngọc */}
        <rect x="11" y="14" width="3" height="3" fill="#10b981" />
        <rect x="18" y="14" width="3" height="3" fill="#10b981" />
        <rect x="12" y="14" width="1" height="2" fill="#064e3b" />
        <rect x="19" y="14" width="1" height="2" fill="#064e3b" />
        {/* Mũi hồng & má hồng phúng phính */}
        <rect x="15" y="17" width="2" height="1" fill="#f43f5e" />
        <rect x="9" y="17" width="2" height="2" fill="#fda4af" />
        <rect x="21" y="17" width="2" height="2" fill="#fda4af" />
        {/* Khăn quàng cổ bếp bánh đỏ */}
        <rect x="11" y="23" width="10" height="3" fill="#e11d48" />
        <rect x="14" y="25" width="4" height="3" fill="#be123c" />
      </svg>
    );
  } else if (id === 'boris') {
    // Boris: Thợ rèn người lùn râu cam rậm, bandana & đai thợ rèn
    content = (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        {/* Bandana da trên trán */}
        <rect x="9" y="5" width="14" height="3" fill="#78350f" />
        <rect x="14" y="4" width="4" height="2" fill="#92400e" />
        {/* Trán & lông mày rậm */}
        <rect x="10" y="8" width="12" height="5" fill="#fed7aa" />
        <rect x="10" y="9" width="4" height="2" fill="#c2410c" />
        <rect x="18" y="9" width="4" height="2" fill="#c2410c" />
        {/* Mắt kiên định */}
        <rect x="11" y="11" width="2" height="2" fill="#1e293b" />
        <rect x="19" y="11" width="2" height="2" fill="#1e293b" />
        <rect x="14" y="12" width="4" height="2" fill="#fb923c" />
        {/* Râu rậm người lùn màu cam đỏ */}
        <rect x="8" y="13" width="16" height="12" fill="#ea580c" />
        <rect x="9" y="15" width="14" height="11" fill="#c2410c" />
        <rect x="11" y="24" width="10" height="4" fill="#9a3412" />
        {/* Bím râu bện có khuyên kim loại */}
        <rect x="14" y="22" width="4" height="2" fill="#fbbf24" />
        {/* Vai áo thợ rèn & quai da */}
        <rect x="6" y="25" width="20" height="5" fill="#475569" />
        <rect x="10" y="25" width="3" height="5" fill="#78350f" />
        <rect x="19" y="25" width="3" height="5" fill="#78350f" />
      </svg>
    );
  }

  return (
    <div
      className={`${styles.portraitBox} ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-label={id}
    >
      {content}
    </div>
  );
}
