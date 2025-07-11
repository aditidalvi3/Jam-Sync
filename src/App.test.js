import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the JAMSYNC logo', () => {
  render(<App />);
  const logoElement = screen.getByText(/JAMSYNC/i);
  expect(logoElement).toBeInTheDocument();
});