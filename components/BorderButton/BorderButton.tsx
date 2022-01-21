import React from 'react';
import styles from './BorderButton.module.scss';

const BorderButton = (props: {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: string;
}): JSX.Element => (
  <button type="button" className={styles.btn} onClick={props.handleClick}>
    {props.children}
  </button>
);

export default BorderButton;
