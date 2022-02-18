import { render, screen } from '@testing-library/react';

import IconButton from 'components/IconButton';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

describe('IconButton', () => {
  describe('Layout', () => {
    it('should render SearchIconButton', () => {
      render(<IconButton icon={faSearch} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    });
  });
  describe('Interaction', () => {
    it('should render IconButton', () => {
      render(<IconButton icon={faSearch} />);
      const iconBtn = screen.getByRole('button');

      // ! : TODO. test onClick
      iconBtn.click();
      expect(iconBtn).toBeInTheDocument();
    });
  });
});
