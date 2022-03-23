import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests Favorite Pokémons page', () => {
  test('Test if screen display "No favorite pokemon found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const noFavoriteText = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoriteText).toBeInTheDocument();
  });

  describe('Tests if all the favorited pokémons cards are displayed', () => {
    test('pikachu card is displayed', () => {
      renderWithRouter(<App />);
      const detailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(detailsLink);

      const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favorito?/i });
      userEvent.click(checkFavorite);

      const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(favoritePokemons);

      const pokeName = screen.getByText(/pikachu/i);
      expect(pokeName).toBeDefined();
    });

    test('charmander card is displayed', () => {
      renderWithRouter(<App />);

      const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(nextButton);

      const detailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(detailsLink);

      const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favorito?/i });
      userEvent.click(checkFavorite);

      const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(favoritePokemons);

      const pokeName = screen.getByText(/Charmander/i);
      expect(pokeName).toBeDefined();
    });
  });
});
