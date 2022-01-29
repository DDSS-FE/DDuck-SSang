import styles from './Spinner.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Spinner = (): JSX.Element => {
  return (
    <i className={cx('fas fa-spinner fa-pulse fa-4x', styles.faSpinner)}></i>
  );
};

export default Spinner;
