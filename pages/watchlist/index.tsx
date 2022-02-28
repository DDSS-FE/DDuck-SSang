import { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import styles from 'pages/watchlist/Watchlist.module.scss';

import Header from 'components/Header';
import IconButton from 'components/IconButton';
import StockList from 'components/StockList';

const Watchlist: NextPage = () => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className={styles.ly_watchlist}>
      <Header>
        <IconButton onClick={() => setEditMode(!editMode)} icon={faEdit} />
        <Link href="/search">
          <a className={styles.el_iconBtn}>
            <FontAwesomeIcon className={styles.el_Icon} icon={faPlus} />
          </a>
        </Link>
      </Header>

      <StockList editMode={editMode} />
    </div>
  );
};

export default Watchlist;
