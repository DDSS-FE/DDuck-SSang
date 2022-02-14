import styles from './KeyInfo.module.scss';

const KeyInfo = (): JSX.Element => {
  return (
    <ul className={styles.bl_keyInfo}>
      <li>
        <p>일일 변동폭</p>
        <p>2591.53 ~ 2668.59</p>
      </li>
      <li>
        <p>52주 가격 변동폭</p>
        <p>591.53 ~ 668.59</p>
      </li>
      <li>
        <p>이전 종가</p>
        <p>91.53 ~ 168.59</p>
      </li>
      <li>
        <p>시가</p>
        <p>91.53 ~ 168.59</p>
      </li>
      <li>
        <p>거래량</p>
        <p>91.53 ~ 168.59</p>
      </li>
      <li>
        <p>평균 거래량</p>
        <p>91.53 ~ 168.59</p>
      </li>
      <li>
        <p># 구성종목</p>
        <p>91.53 ~ 168.59</p>
      </li>
      <li>
        <p>1년 변동률</p>
        <p>91.53 ~ 168.59</p>
      </li>
    </ul>
  );
};

export default KeyInfo;
