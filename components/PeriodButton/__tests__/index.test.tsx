import { render, screen } from '@testing-library/react';
import { PeriodButton } from 'components/PeriodButton/index';
import userEvent from '@testing-library/user-event';

describe('Chart Period Button', () => {
  const props = {
    callPeriod: () => {},
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
    it('has is_active class name when click 15분 button', () => {
      render(<PeriodButton {...props} />);
      const listitem = screen
        .queryAllByRole('listitem')
        .find((li) => li.textContent === '15분');
      // Argument of type 'HTMLElement | undefined' is not assignable to parameter of type 'Element'.
      // Type 'undefined' is not assignable to type 'Element'.
      if (listitem) {
        userEvent.click(listitem);
        expect(listitem).toHaveClass('is_active');
      } else {
        expect(listitem).toHaveTextContent('15분');
      }
    });
  });
});
