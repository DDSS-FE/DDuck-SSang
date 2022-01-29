import { NextPage } from 'next';

import styles from './More.module.scss';

import MoreList from '../../components/MoreList';

const More: NextPage = () => {
  return (
    <div className={styles.ly_more}>
      <MoreList />
    </div>
  );
};

export default More;
