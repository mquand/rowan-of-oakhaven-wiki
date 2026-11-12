import styles from './Terms.module.scss';

export const metadata = {
  title: 'Điều Khoản Sử Dụng — Rowan of Oakhaven Wiki',
};

export default function TermsPage() {
  return (
    <div className={styles.container}>
      <h1>Điều Khoản Sử Dụng</h1>
      <p>
        Nội dung trên wiki Rowan of Oakhaven được cung cấp miễn phí để tham khảo về trò chơi
        Rowan of Oakhaven của Fluvio Games.
      </p>
      <p>
        Tất cả tài nguyên trò chơi (hình ảnh, âm thanh, thiết kế nhân vật) thuộc về Fluvio Games.
        Wiki này không 주장했다 quyền sở hữu đối với bất kỳ tài nguyên nào của trò chơi.
      </p>
    </div>
  );
}
