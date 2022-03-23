import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests Pokédex component', () => {
  test('tests if the heading "Encountered pokémons" is displayed', () => {
    renderWithRouter(<App />);
    const expectedHeading = screen.getByText(/Encountered pokémons/i);
    expect(expectedHeading).toBeInTheDocument();
  });

  test('test if the pokédex has filters buttons', () => {
    renderWithRouter(<App />);
    const totalFilters = 7;
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    expect(filterButton).toHaveLength(totalFilters);
  });

  test('test if the pokédex has a reset filters button', () => {
    renderWithRouter(<App />);

    const bugButton = screen.getByRole('button', { name: /bug/i });
    userEvent.click(bugButton);
    const bugPokemon = screen.getByText(/Caterpie/i);
    expect(bugPokemon).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  describe('tests next pokémon button', () => {
    test('test if the button contains the right text', () => {
      renderWithRouter(<App />);
      const buttonText = screen.getByText(/próximo pokémon/i);
      expect(buttonText).toBeInTheDocument();
    });

    test('tests if the next pokémon is displayed', () => {
      renderWithRouter(<App />);

      const button = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(button);

      const charmander = screen.getByText(/charmander/i);
      expect(charmander).toBeInTheDocument();
    });

    test('tests if the first pokémon is displayed after the last', () => {
      renderWithRouter(<App />);
      const button = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
    });

    test('test if only one pokémon is shown at click', () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getAllByRole('link', { name: /More details/i });
      expect(moreDetails).toHaveLength(1);
    });
  });
});
