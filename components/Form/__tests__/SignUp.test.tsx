import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from 'components/Form';

describe('SignUp', () => {
  describe('Layout', () => {
    it('has SignUp headding', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const heading = screen.getByRole('heading', { name: 'SignUp' });
      expect(heading).toBeInTheDocument();
    });
    it('has Email input', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const input = screen.getByLabelText('Email Address');
      expect(input).toBeInTheDocument();
    });
    it('has Username input', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
    });
    it('has Password input', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
    });
    it('has Submit button', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const submit = screen.getByRole('button', {
        name: 'Enter a valid value',
      });
      expect(submit).toBeInTheDocument();
    });
    it('has Cancel button', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const cancle = screen.getByRole('button', { name: 'Cancle' });
      expect(cancle).toBeInTheDocument();
    });
    it('disabled when the Submit button initialized', () => {
      render(<Form isSignIn={false} />);
      const button = screen.getByRole('button', { name: '회원가입' });
      userEvent.click(button);
      const input = screen.getByRole('button', { name: 'Enter a valid value' });
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
        const email = screen.getByLabelText('Email Address');
        const username = screen.getByLabelText('Username');
        const password = screen.getByLabelText('Password');
        const submit = screen.getByRole('button', {
          name: 'Enter a valid value',
        });

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
        const email = screen.getByLabelText('Email Address');
        const username = screen.getByLabelText('Username');
        const password = screen.getByLabelText('Password');
        const submit = screen.getByRole('button', {
          name: 'Enter a valid value',
        });

        userEvent.type(email, $email);
        userEvent.type(username, $username);
        userEvent.type(password, $password);
        expect(submit).toBeDisabled();
      }
    );
  });
});
