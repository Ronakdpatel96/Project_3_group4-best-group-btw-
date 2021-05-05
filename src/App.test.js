import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders App to see if login remains after event fire', () => {
    const result = render(<App />); 
    
    const a = screen.getByText('Penalty Chess');
    expect(a).toBeInTheDocument();
    
    const b =  screen.getByText('Heroku');
    expect(b).toBeInTheDocument();
    
});