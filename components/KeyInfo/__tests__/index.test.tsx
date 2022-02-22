import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen } from '@testing-library/react';

import { KeyInfo } from 'components/KeyInfo';
import { MARKET_INFO_API } from 'utils/config';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('KeyInfo 컴포넌트는', () => {
  beforeEach(() => {
    server.use(
      rest.get(MARKET_INFO_API, (req, res, ctx) => {
        return res(
          ctx.json({
            dayLow: 150,
            dayHigh: 200,
            fiftyTwoWeekLow: 100,
            fiftyTwoWeekHigh: 220,
            open: 160,
            previousClose: 130,
            volume: 1000,
            averageVolume: 8000,
          }),
          ctx.status(200)
        );
      })
    );
  });

  it.each`
    textNames
    ${'일일 변동폭'}
    ${'52주 가격 변동폭'}
    ${'이전 종가'}
    ${'시가'}
    ${'거래량'}
    ${'평균 거래량'}
  `('텍스트 "$textNames"를 가진다.', async ({ textNames }) => {
    render(<KeyInfo symbol="" />);

    const keyInfoComponent = await screen.findByTestId('KeyInfo-component');

    expect(keyInfoComponent).toHaveTextContent(textNames);
  });

  it.each`
    name                     | value
    ${'dayLowHigh'}          | ${'150 ~ 200'}
    ${'fiftyTwoWeekLowHigh'} | ${'100 ~ 220'}
    ${'open'}                | ${'160'}
    ${'previousClose'}       | ${'130'}
    ${'volume'}              | ${'1000'}
    ${'averageVolume'}       | ${'8000'}
  `('텍스트 "$name" 에 해당하는 값은 $value이다.', async ({ name, value }) => {
    render(<KeyInfo symbol="" />);

    const keyInfoValues = await screen.findByTestId(name);

    const regex = new RegExp(`^${value}$`);
    expect(keyInfoValues).toHaveTextContent(regex);
  });
});
