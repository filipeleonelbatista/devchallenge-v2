import React from 'react';
import { render } from '@testing-library/react';
import Routes from './routes';

test('render login page', () => {
  const { getByText } = render(<Routes />);
  const linkElement = getByText(/buscar/i);
  expect(linkElement).toBeInTheDocument();
});
