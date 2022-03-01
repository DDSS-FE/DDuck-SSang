import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from 'components/Form';

describe('SignIn', () => {
  describe('Layout', () => {
    it('has SignIn heading', () => {
      render(<Form isSignIn={true} />);
      const button = screen.getByRole('button', { name: '로그인' });
      userEvent.click(button);
      const heading = screen.getByRole('heading', { name: 'SignIn' });
      expect(heading).toBeInTheDocument();
    });
    it('has Email input', () => {
      render(<Form isSignIn={true} />);
      const button = screen.getByRole('button', { name: '로그인' });
      userEvent.click(button);
      const input = screen.getByLabelText('Email Address');
      expect(input).toBeInTheDocument();
    });
    it('has Password input', () => {
      render(<Form isSignIn={true} />);
      const button = screen.getByRole('button', { name: '로그인' });
      userEvent.click(button);
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
    });
    it('has Submit button', () => {
      render(<Form isSignIn={true} />);
      const button = screen.getByRole('button', { name: '로그인' });
      userEvent.click(button);
      const submit = screen.getByRole('button', {
        name: 'Enter a valid value',
      });
      expect(submit).toBeInTheDocument();
    });
    it('has Cancel button', () => {
      render(<Form isSignIn={true} />);
      const button = screen.getByRole('button', { name: '로그인' });
      userEvent.click(button);
      const cancle = screen.getByRole('button', { name: 'Cancle' });
      expect(cancle).toBeInTheDocument();
    });
    it('disabled when the Submit button initialized', () => {
      render(<Form isSignIn={true} />);
      const button = screen.getByRole('button', { name: '로그인' });
      userEvent.click(button);
      const submit = screen.getByRole('button', {
        name: 'Enter a valid value',
      });
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
      const email = screen.getByLabelText('Email Address');
      const password = screen.getByLabelText('Password');
      const submit = screen.getByRole('button', {
        name: 'Enter a valid value',
      });
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
        const email = screen.getByLabelText('Email Address');
        const password = screen.getByLabelText('Password');
        const submit = screen.getByRole('button', {
          name: 'Enter a valid value',
        });

        userEvent.type(email, $email);
        userEvent.type(password, $password);
        expect(submit).toBeDisabled();
      }
    );
  });
});
