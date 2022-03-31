import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Form } from 'components/Form';

import useUser from 'store/modules/user/useUser';

jest.mock('store/modules/user/useUser');
const mockUseUser = useUser as jest.Mock;

const useUserReturn = {
  isLoggedIn: false,
  userData: null,
  login: 1,
  logout: 2,
};

describe('SignUp', () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => useUserReturn);
  });

  describe('Layout', () => {
    it('has Email input', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const input = screen.getByLabelText('이메일');
      expect(input).toBeInTheDocument();
    });
    it('has Username input', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const input = screen.getByLabelText('이름');
      expect(input).toBeInTheDocument();
    });
    it('has Password input', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const input = screen.getByLabelText('비밀번호');
      expect(input).toBeInTheDocument();
    });
    it('has Submit button', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const submit = screen.getByTestId('submit');
      expect(submit).toBeInTheDocument();
    });
    it('has Cancel button', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const cancle = screen.getByRole('button', { name: '취소' });
      expect(cancle).toBeInTheDocument();
    });
    it('disabled when the Submit button initialized', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const input = screen.getByTestId('submit');
      expect(input).toBeDisabled();
    });
  });
  describe('Interactions', () => {
    it.each`
      $email         | $username         | $password
      ${'emailtest'} | ${'usernametest'} | ${'passwordtest'}
      ${'123456'}    | ${'123'}          | ${'123456'}
    `(
      'enabled when all validation pass',
      ({ $email, $username, $password }) => {
        render(<Form isSignIn={false} />);
        const button = screen.getByRole('button', { name: '회원가입' });
        userEvent.click(button);
        const email = screen.getByLabelText('이메일');
        const username = screen.getByLabelText('이름');
        const password = screen.getByLabelText('비밀번호');
        const submit = screen.getByTestId('submit');

        userEvent.type(email, $email);
        expect(submit).toBeDisabled();
        userEvent.type(username, $username);
        expect(submit).toBeDisabled();
        userEvent.type(password, $password);
        expect(submit).toBeEnabled();
      }
    );
    it.each`
      $email         | $username         | $password
      ${'passEmail'} | ${'passUsername'} | ${'X'}
      ${'passEmail'} | ${'X'}            | ${'X'}
      ${'X'}         | ${'passUsername'} | ${'passPassword'}
      ${'X'}         | ${'passUsername'} | ${'X'}
      ${'passEmail'} | ${'X'}            | ${'passPassword'}
      ${'X'}         | ${'X'}            | ${'passPassword'}
      ${'X'}         | ${'X'}            | ${'X'}
    `(
      'disabled when any one of them does not pass validation',
      ({ $email, $username, $password }) => {
        render(<Form isSignIn={false} />);
        const button = screen.getByRole('button', { name: '회원가입' });
        userEvent.click(button);
        const email = screen.getByLabelText('이메일');
        const username = screen.getByLabelText('이름');
        const password = screen.getByLabelText('비밀번호');
        const submit = screen.getByTestId('submit');

        userEvent.type(email, $email);
        userEvent.type(username, $username);
        userEvent.type(password, $password);
        expect(submit).toBeDisabled();
      }
    );
  });
});
