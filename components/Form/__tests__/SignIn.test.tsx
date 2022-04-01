import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from 'components/Form';

import useUser from 'store/modules/user/useUser';

jest.mock('store/modules/user/useUser');
export const mockUseUser = useUser as jest.Mock;

export const useUserReturn = {
  isLoggedIn: false,
  userData: null,
  login: 1,
  logout: 2,
};

describe('SignIn', () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => useUserReturn);
  });

  describe('Layout', () => {
    it('has Email input', () => {
      render(<Form isSignIn={true} />);
      const button = screen.getByRole('button', { name: '로그인' });
      userEvent.click(button);
      const input = screen.getByLabelText('이메일');
      expect(input).toBeInTheDocument();
    });
    it('has Password input', () => {
      render(<Form isSignIn={true} />);
      const button = screen.getByRole('button', { name: '로그인' });
      userEvent.click(button);
      const input = screen.getByLabelText('비밀번호');
      expect(input).toBeInTheDocument();
    });
    it('has Submit button', () => {
      render(<Form isSignIn={true} />);
      const button = screen.getByRole('button', { name: '로그인' });
      userEvent.click(button);
      const submit = screen.getByTestId('submit');
      expect(submit).toBeInTheDocument();
    });
    it('has Cancel button', () => {
      render(<Form isSignIn={true} />);
      const button = screen.getByRole('button', { name: '로그인' });
      userEvent.click(button);
      const cancle = screen.getByRole('button', { name: '취소' });
      expect(cancle).toBeInTheDocument();
    });
    it('disabled when the Submit button initialized', () => {
      render(<Form isSignIn={true} />);
      const button = screen.getByRole('button', { name: '로그인' });
      userEvent.click(button);
      const submit = screen.getByTestId('submit');
      expect(submit).toBeDisabled();
    });
  });
  describe('Interactions', () => {
    it.each`
      $email         | $password
      ${'emailtest'} | ${'passwordtest'}
      ${'123456'}    | ${'123456'}
    `('enabled when all validation pass', ({ $email, $password }) => {
      render(<Form isSignIn={true} />);
      const button = screen.getByRole('button', { name: '로그인' });
      userEvent.click(button);
      const email = screen.getByLabelText('이메일');
      const password = screen.getByLabelText('비밀번호');
      const submit = screen.getByTestId('submit');
      userEvent.type(email, $email);
      expect(submit).toBeDisabled();
      userEvent.type(password, $password);
      expect(submit).toBeEnabled();
    });
    it.each`
      $email         | $password
      ${'passEmail'} | ${'X'}
      ${'X'}         | ${'passPassword'}
      ${'X'}         | ${'X'}
    `(
      'disabled when any one of them does not pass validation',
      ({ $email, $password }) => {
        render(<Form isSignIn={true} />);
        const button = screen.getByRole('button', { name: '로그인' });
        userEvent.click(button);
        const email = screen.getByLabelText('이메일');
        const password = screen.getByLabelText('비밀번호');
        const submit = screen.getByTestId('submit');

        userEvent.type(email, $email);
        userEvent.type(password, $password);
        expect(submit).toBeDisabled();
      }
    );
  });
});
