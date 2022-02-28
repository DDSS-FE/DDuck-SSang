import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import styles from 'pages/watchlist/Watchlist.module.scss';

import Header from 'components/Header';
import IconButton from 'components/IconButton';
import StockList from 'components/StockList';

// interface WatchlistItem {
//   id: number;
//   name: string;
//   symbol: string;
// }

export default function Watchlist({}: // watchlist,
{
  // watchlist: WatchlistItem[];
}) {
  const [editMode, setEditMode] = useState(false);

  // console.log('data', watchlist);

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
}

// export async function getServerSideProps() {
//   // if (typeof window === 'undefined') {
//   //   return {
//   //     props: {
//   //       watchlist: [],
//   //     },
//   //   };
//   // }

//   if (typeof window !== 'undefined' && localStorage.getItem('token')) {
//     const res2 = await fetch(`http://localhost:1337/api/watchlists`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     });
//     console.log(res2);
//     const data = await res2.json();

//     return {
//       props: {
//         watchlist: data,
//       },
//     };
//   } else {
//     return {
//       props: {
//         watchlist: [],
//       },
//     };
//   }
// }
