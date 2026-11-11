import Link from 'next/link';
import styles from './Home.module.scss';
import { getAllDocs } from '../lib/docs';
import { getItems, getRecipes, getCharacters } from '../lib/gameData';

export default function HomePage() {
  const docs = getAllDocs();
  const items = getItems();
  const recipes = getRecipes();
  const characters = getCharacters();

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.preTitle}>Fluvio Games Presents</div>
          <h1>
            🍃 <span>Rowan of Oakhaven</span>
          </h1>
          <p className={styles.tagline}>
            Một tách trà ấm sau chuỗi ngày mệt mỏi. Trải nghiệm Cozy Dark Pixel RPG kết hợp nghệ thuật
            pha trà ASMR, nướng bánh ma thuật, làm vườn và xoa dịu quái vật.
          </p>
          <div className={styles.heroActions}>
            <Link href="/wiki/game-overview" className={styles.primaryBtn}>
              Khám Phá Cốt Truyện ↗
            </Link>
            <Link href="/database/recipes" className={styles.secondaryBtn}>
              Sổ Pha Trà & Bánh ☕
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Trụ Cột Trải Nghiệm</h2>
          <p>Bốn giá trị cốt lõi làm nên sự ấm áp và khác biệt của Rowan of Oakhaven</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🍵</div>
            <h3>Pha Trà ASMR Xúc Giác</h3>
            <p>
              Tương tác vật lý chân thực: tiếng đá lách cách, nước sôi róc rách, xoáy nước đổi màu
              huyền ảo cùng hương hoa sen ngậm sương.
            </p>
            <Link href="/database/recipes" className={styles.cardLink}>
              Xem thực đơn trà →
            </Link>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>🥐</div>
            <h3>Lò Bánh Trăng Sao</h3>
            <p>
              Nhào bột dẻo quánh, dập khuôn trăng sao, nướng bánh trong lò đá than hồng canh giờ vàng
              ruộm nở giòn đón khách.
            </p>
            <Link href="/database/recipes" className={styles.cardLink}>
              Xem công thức bánh →
            </Link>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>🌿</div>
            <h3>Nông Trại & Hang Mỏ</h3>
            <p>
              Gieo trồng thảo mộc, hái dâu tuyết dạ quang và cầm Đèn Đom Đóm soi bóng hang mỏ tinh thể
              100 tầng tìm quặng quý.
            </p>
            <Link href="/database/items" className={styles.cardLink}>
              Khám phá tài nguyên →
            </Link>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>💖</div>
            <h3>Xoa Dịu Quái Vật (Soothe)</h3>
            <p>
              Không gươm đao tàn bạo. Giải giáp và thuần hóa quái vật bằng những chiếc bánh thơm lừng
              đánh trúng điểm yếu vị giác.
            </p>
            <Link href="/wiki/game-overview" className={styles.cardLink}>
              Tìm hiểu cơ chế →
            </Link>
          </div>
        </div>
      </section>

      {/* Database Quick Cards */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Cơ Sở Dữ Liệu Trò Chơi</h2>
          <p>Dữ liệu được cập nhật tự động từ hệ thống tài liệu chuẩn</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📦</div>
            <h3>Vật Phẩm ({items.length})</h3>
            <p>Hạt giống, thảo mộc, khoáng sản, tinh thể và nguyên liệu pha chế.</p>
            <Link href="/database/items" className={styles.cardLink}>
              Mở kho vật phẩm →
            </Link>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>📜</div>
            <h3>Công Thức ({recipes.length})</h3>
            <p>Các món trà thanh nhiệt và mẻ bánh nướng chữa lành tâm hồn.</p>
            <Link href="/database/recipes" className={styles.cardLink}>
              Mở sổ công thức →
            </Link>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>👥</div>
            <h3>Dân Làng ({characters.length})</h3>
            <p>Gặp gỡ Rowan, Pip, Mallow, Lumi, Boris và các cư dân Năm Vương Quốc.</p>
            <Link href="/database/characters" className={styles.cardLink}>
              Gặp gỡ cư dân →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
