import styles from './Privacy.module.scss';

export const metadata = {
  title: 'Chính Sách Bảo Mật — Rowan of Oakhaven Wiki',
};

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <h1>Chính Sách Bảo Mật</h1>
      <p>
        Wiki Rowan of Oakhaven không thu thập dữ liệu cá nhân nào từ người truy cập. Trang web
        này chỉ đọc file tài liệu cục bộ trong repo và hiển thị chúng trên trình duyệt của bạn.
      </p>
      <p>
        Nếu bạn gửi phản hồi qua GitHub issue, dữ liệu bạn cung cấp sẽ được lưu theo chính sách
        của GitHub.
      </p>
    </div>
  );
}
