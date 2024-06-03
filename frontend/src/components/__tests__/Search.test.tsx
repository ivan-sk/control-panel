import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from 'components/Search';

describe('Search', () => {
  it('should render the component correctly', () => {
    render(<Search setAccountId={jest.fn()} handleSearch={jest.fn()} accountId="id12345"/>);
    expect(screen.getByLabelText(/enter account id/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('should invoke search on button click', () => {
    const handleSearch = jest.fn();
    render(<Search setAccountId={jest.fn()} handleSearch={handleSearch} accountId="id12345"/>);
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    expect(handleSearch).toHaveBeenCalled();
  });

  it('should invoke search on Enter key press', () => {
    const handleSearch = jest.fn();
    render(<Search setAccountId={jest.fn()} handleSearch={handleSearch} accountId="id12345"/>);
    const input = screen.getByLabelText(/enter account id/i);
    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(handleSearch).toHaveBeenCalled();
  });
});
