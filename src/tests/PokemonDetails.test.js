import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests <PokemonDetails /> component', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });
  describe('Tests if the correct detailed pokemon description is displayed', () => {
    test('tests if the correct pokemon name is displayed', () => {
      const expectedText = screen.getByText(/Pikachu Details/i);
      expect(expectedText).toBeInTheDocument();
    });

    test('tests if the more details link is not displayed', () => {
      const detailsLink = screen.queryByRole('link', { name: /more details/i });
      expect(detailsLink).not.toBeInTheDocument();
    });

    test('tests if summaty headig is displayed', () => {
      const summaryHeading = screen.getByRole('heading', { name: /Summary/i });
      expect(summaryHeading).toBeInTheDocument();
    });

    test('test if there is a paragraph describing the pokemon', () => {
      const paragraph = screen.getByText(/This intelligent Pokémon/i);
      expect(paragraph).toBeInTheDocument();
    });
  });

  describe('Tests the map section', () => {
    test('test if there is heading with the correct text', () => {
      const heading = screen.getByText(/Game Locations of Pikachu/i);
      expect(heading).toBeInTheDocument();
    });

    test('test if all locations are displayed', () => {
      const totalLocations = 2;
      const altText = screen.getAllByAltText(/pikachu location/i);
      expect(altText).toHaveLength(totalLocations);

      const viridian = screen.getByText(/Kanto Viridian Forest/i);
      const powerPlant = screen.getByText(/Kanto Power Plant/i);
      expect(viridian && powerPlant).toBeInTheDocument();

      const VIRIDIAN_SRC = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
      const POWERPLANT_SRC = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
      expect(altText[0]).toHaveAttribute('src', VIRIDIAN_SRC);
      expect(altText[1]).toHaveAttribute('src', POWERPLANT_SRC);
    });
  });

  describe('Test the favorite checkbox', () => {
    test('test if the favorite checkbox is displayed', () => {
      const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
      expect(checkbox).toBeInTheDocument();
    });

    test('test if alternated clicks works', () => {
      const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });
});
