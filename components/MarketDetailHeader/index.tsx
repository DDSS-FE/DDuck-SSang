import styles from 'components/MarketDetailHeader/MarketDetailHeader.module.scss';

interface Props {
  priceLast: number;
  priceChangeValue: number;
  priceChangePercent: number;
}

const MarketDetailHeader = ({
  priceLast,
  priceChangeValue,
  priceChangePercent,
}: Props): JSX.Element => {
  return (
    <header
      data-testid="MarketDetailHeader-component"
      className={styles.ly_header}
    >
      <div className={styles.ly_header_inner}>
        <span className={styles.bl_marketPriceHeading}>
          <div className={styles.bl_marketPriceHeading_price}>
            <h2>{priceLast}</h2>
            <p data-testid="header-price">
              +{priceChangeValue} ({priceChangePercent}%)
            </p>
          </div>
          <div
            data-testid="header-standard"
            className={styles.bl_marketPriceHeading_standard}
          >
            {/* {metadataTime} - 실시간. {metadataCurrency} */}
          </div>
        </span>
      </div>
    </header>
  );
};

export default MarketDetailHeader;
