import styles from './Terms.module.scss';

export const metadata = {
  title: 'Điều Khoản Sử Dụng — Rowan of Oakhaven Wiki',
};

export default function TermsPage() {
  return (
    <div className={`${styles.container} pixel-frame`}>
      <p className={styles.kicker}>Legal / Terms</p>
      <h1 className={styles.title}>Điều Khoản Sử Dụng</h1>
      <p>
        Bách khoa toàn thư Rowan of Oakhaven được duy trì nhằm mục đích cung cấp thông tin, hướng dẫn
        và tư liệu tham khảo công khai cho người chơi tựa game Rowan of Oakhaven do Fluvio Games phát triển.
      </p>
      <p>
        Mọi hình ảnh, tư liệu truyền thuyết, tên nhân vật và nội dung bản quyền thuộc về Fluvio Games.
        Mã nguồn hiển thị của wiki được phát hành mở dưới giấy phép của dự án.
      </p>
    </div>
  );
}
