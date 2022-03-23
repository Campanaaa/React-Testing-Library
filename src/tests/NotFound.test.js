import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests Component NotFound', () => {
  test('Test if there is a heading "Page requested not found 😭"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/anything');

    const expectedHeading = screen.getByText(/Page requested not found/i);
    expect(expectedHeading).toBeInTheDocument();
  });

  test('Test if there is a image in the page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/anything');

    const IMG_SRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(/pikachu crying/i);
    expect(img).toHaveAttribute('src', IMG_SRC);
  });
});
