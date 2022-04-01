import { render, screen } from '@testing-library/react';

import { StockList } from 'components/StockList';

import useWatchlist from 'store/modules/watchlist/useWatchlist';

jest.mock('store/modules/watchlist/useWatchlist');
const mockUseWatchlist = useWatchlist as jest.Mock;

const watchlistData = [
  {
    c: 1,
    d: 1,
    dp: 1,
    id: 1,
    symbol: 'A',
  },
  {
    c: 2,
    d: 2,
    dp: 2,
    id: 2,
    symbol: 'B',
  },
];

const useWatchlistReturn = {
  watchlistData,
  watchlistStatus: 'notLoading',
  fetchWatchlist: () => {},
  deleteWatchlist: () => {},
};

const useWatchlistNoData = {
  watchlistData: [],
  watchlistStatus: 'notLoading',
  fetchWatchlist: () => {},
  deleteWatchlist: () => {},
};

describe('StockList', () => {
  describe('Layout', () => {
    beforeEach(() => {
      mockUseWatchlist.mockImplementation(() => useWatchlistReturn);
    });

    it('관심목록 데이터가 존재하지 않을 때 `관심 목록이 없습니다.`를 보여준다.', () => {
      mockUseWatchlist.mockImplementation(() => useWatchlistNoData);
      render(<StockList editMode={false} />);
      const component = screen.getByTestId('no-watchlist-message');
      expect(component).toHaveTextContent('관심 목록이 없습니다.');
    });
    it('편집 모드가 아닐 때 symbol, 시간, 지역, 현재가, 퍼센트변화율을 포함하는 MarketInfoListItem 컴포넌트를 보여준다.', () => {
      render(<StockList editMode={false} />);
      expect(
        screen.getAllByTestId('MarketInfoListItem-component')[0]
      ).toBeInTheDocument();
    });
    it('편집 모드일 때 symbol, 지역, 삭제 아이콘을 보여준다.', () => {
      render(<StockList editMode={true} />);
      const component = screen.getAllByTestId('stock-list-item-symbol')[0];
      expect(component).toBeInTheDocument();
    });
  });
});
