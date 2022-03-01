import { render, screen } from '@testing-library/react';
import Chart from 'components/Chart/';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { CANDLE_API } from 'utils/config';

const server = setupServer();

beforeEach(() => {
  server.resetHandlers();
});
beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});

describe('Chart', () => {
  beforeEach(() => {
    server.use(
      rest.get(CANDLE_API, (req, res, ctx) => {
        return res(ctx.json({}));
      })
    );
  });

  it.each`
    textNames
    ${'15분'}
    ${'30분'}
    ${'60분'}
    ${'1일'}
    ${'1주'}
    ${'1달'}
  `('has Chart text', async ({ textNames }) => {
    render(<Chart symbol="" />);
    expect(await screen.findByRole('list')).toHaveTextContent(textNames);
  });
});
