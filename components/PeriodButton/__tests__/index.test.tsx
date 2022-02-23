import { render, screen } from '@testing-library/react';
import { PeriodButton } from 'components/PeriodButton/index';
import userEvent from '@testing-library/user-event';

describe('Chart Period Button', () => {
  const props = {
    setPeriod: () => {},
  };
  describe('Layout', () => {
    it.each`
      period
      ${'15분'}
      ${'30분'}
      ${'60분'}
      ${'1일'}
      ${'1주'}
      ${'1달'}
    `('has $period text', ({ period }) => {
      render(<PeriodButton {...props} />);
      const component = screen.getByTestId('PeriodButton-component');
      expect(component).toHaveTextContent(period);
    });
  });
  describe('Interactions', () => {
    it('has is_active class name when init', () => {
      render(<PeriodButton {...props} />);
      const listitem = screen
        .getAllByRole('listitem')
        .find((li) => li.textContent === '1일');
      expect(listitem).toHaveClass('is_active');
    });
    it.each`
      listitemTxt
      ${'15분'}
      ${'30분'}
      ${'60분'}
      ${'1일'}
      ${'1주'}
      ${'1달'}
    `('has not is_active class name when init', ({ listitemTxt }) => {
      render(<PeriodButton {...props} />);
      const listitem = screen
        .getAllByRole('listitem')
        .find((li) => li.textContent !== listitemTxt);
      expect(listitem).not.toHaveClass('is_active');
    });
    it.each`
      period
      ${'15분'}
      ${'30분'}
      ${'60분'}
      ${'1일'}
      ${'1주'}
      ${'1달'}
    `('has is_active class name when click $period button', ({ period }) => {
      render(<PeriodButton {...props} />);
      const listitem = screen
        .getAllByRole('listitem')
        .filter((li) => li.textContent === period);

      const item = listitem[0];
      userEvent.click(item);
      expect(item).toHaveClass('is_active');
    });
  });
});
