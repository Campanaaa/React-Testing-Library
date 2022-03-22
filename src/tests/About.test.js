import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests component <About />', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
  });

  test('Tests if Pokédex info is present in the page', () => {
    const aboutText = screen.getByText(/This application simulates/i);
    expect(aboutText).toBeInTheDocument();
  });

  test('Tests if there is a heading "h2" with the text "About Pokédex."', () => {
    const headerPokedex = screen.getByText(/About Pokédex/i);
    expect(headerPokedex).toBeInTheDocument();
  });

  test('Tests if there is a Pokédex image in the page', () => {
    const IMG_SRC = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img.src).toEqual(IMG_SRC);
  });
});
