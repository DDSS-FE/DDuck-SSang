import { useState } from 'react';
import { useRouter } from 'next/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import styles from 'pages/watchlist/Watchlist.module.scss';

import Header from 'components/Header';
import IconButton from 'components/IconButton';
import MarketStock from 'components/MarketStock';

export default function WatchlistPage() {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.ly_watchlist}>
      <Header>
        <IconButton onClick={() => setEditMode(!editMode)} icon={faEdit} />
        <IconButton
          onClick={() => router.push('/search/market')}
          icon={faPlus}
        />
      </Header>

      <MarketStock category={undefined} editMode={editMode} />
    </div>
  );
}
