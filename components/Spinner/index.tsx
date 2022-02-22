import { NextComponentType } from 'next';

import styles from 'components/Spinner/Spinner.module.scss';

const Spinner: NextComponentType = () => {
  return (
    <div className={styles.el_spinner} data-testid="Spinner-component">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
