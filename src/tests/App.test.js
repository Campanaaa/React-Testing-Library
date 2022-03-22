import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Test <App /> component', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });

  test('Tests navigations links', () => {
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favorite = screen.getByText('Favorite Pokémons');

    expect(home && about && favorite).toBeInTheDocument();
  });

  test('Tests if link "Home" redirects to path "/"', () => {
    const link = screen.getByRole('link', { name: /home/i });
    userEvent.click(link);
    const homeText = screen.getByText('Encountered pokémons');
    expect(homeText).toBeInTheDocument();
  });

  test('Tests if link "About" redirects to path "/about"', () => {
    const link = screen.getByRole('link', { name: /about/i });
    userEvent.click(link);
    const aboutText = screen.getByText('About Pokédex');
    expect(aboutText).toBeInTheDocument();
  });

  test('Tests if link "Favorite Pokémons" redirects to path "/favorites"', () => {
    const link = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(link);
    const favoriteText = screen.getByText('Favorite pokémons');
    expect(favoriteText).toBeInTheDocument();
  });

  test('Tests if it redirects to "Not Found" with an unkown url', () => {
    const history = createMemoryHistory();
    history.push('/anything');
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const notFountText = screen.getByText('Page requested not found');
    expect(notFountText).toBeInTheDocument();
  });
});
