// import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen } from '@testing-library/react';

import StockList from 'components/StockList';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('StockList 컴포넌트는', () => {
  beforeEach(() => {
    // server.use(
    //   rest.get(`http://localhost:1337/api/watchlists`, (req, res, ctx) => {
    //     return res(
    //       ctx.json([
    //         {
    //           c: 1,
    //           d: 1,
    //           dp: 1,
    //           id: 1,
    //           symbol: 'A',
    //         },
    //         {
    //           c: 2,
    //           d: 2,
    //           dp: 2,
    //           id: 2,
    //           symbol: 'B',
    //         },
    //       ]),
    //       ctx.status(200)
    //     );
    //   })
    // );
  });

  describe('Layout', () => {
    it('관심목록 데이터가 존재하지 않을 때 `관심 목록이 없습니다.`를 보여준다.', () => {
      render(<StockList editMode={false} />);
      const component = screen.getByTestId('no-watchlist-message');
      expect(component).toHaveTextContent('관심 목록이 없습니다.');
    });
    // 내부 컴포넌트 테스트
    // it('편집 모드가 아닐 때 symbol, 시간, 지역, 현재가, 퍼센트변화율을 포함하는 MarketInfoListItem 컴포넌트를 보여준다.', () => {
    //   render(<StockList editMode={false} />);
    //   expect(screen.getByText('123')).toBeInTheDocument();
    // });
    // it('편집 모드일 때 symbol, 지역, 삭제 아이콘을 보여준다.', () => {
    //   render(<StockList editMode={true} />);
    //   const component = screen.getByTestId('stock-list-item-symbol');
    //   expect(component).toBeInTheDocument();
    // });
  });
});
