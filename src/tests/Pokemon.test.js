import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests <Pokemon /> Component', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('the correct pokémon name is displayed', () => {
    const pikachuText = screen.getByText(/pikachu/i);
    expect(pikachuText).toBeInTheDocument();
  });

  test('the correct pokémon type is displayed', () => {
    const pikachuType = 'Electric';
    const textType = screen.getByTestId('pokemon-type');
    expect(textType).toHaveTextContent(pikachuType);
  });

  test('the corret average weight text is displayed', () => {
    const expectedWeight = '6.0';
    const unit = 'kg';
    const expectedText = `Average weight: ${expectedWeight} ${unit}`;
    const pageText = screen.getByTestId('pokemon-weight');
    expect(pageText).toHaveTextContent(expectedText);
  });

  test('the corret pokémon image is displayed', () => {
    const img = screen.getByAltText(/Pikachu sprite/i);
    const IMG_SRC = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img).toHaveAttribute('src', IMG_SRC);
  });

  test('test if there is a corret link to the pokemon details', () => {
    const linkPokemon = screen.getByRole('link', { name: /details/ });
    expect(linkPokemon.href).toContain('/pokemons/25');
  });

  test('test if clicking on the details link takes the user to the correct page', () => {
    const linkPokemon = screen.getByRole('link', { name: /details/i });
    userEvent.click(linkPokemon);
    const expectedText = screen.getByText(/Pikachu Details/i);
    expect(expectedText).toBeInTheDocument();
  });

  test('test if a favorited pokémon has a star icon', () => {
    const linkPokemon = screen.getByRole('link', { name: /details/i });
    userEvent.click(linkPokemon);

    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);

    const star = screen.getAllByAltText(/Pikachu is marked/i);
    expect(star[0].src).toContain('/star-icon.svg');
  });
});
