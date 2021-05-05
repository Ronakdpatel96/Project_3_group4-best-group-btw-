/* eslint-disable */
import { render, screen, fireEvent } from '@testing-library/react';
import Landing from './Landing';

test('renders App to see if login remains after event fire', () => {
  const result = render(<Landing />); 
  
  const a = screen.getByText('Links:');
  expect(a).toBeInTheDocument();
  
  const b = screen.getByText('Javascript'); 
  expect(b).toBeInTheDocument();
  
});