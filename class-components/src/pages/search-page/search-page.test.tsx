import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { store } from '@/app/providers/store/configureStore';
import { Layout } from '@/components/layout/layout';

import { DetailsPage } from '../details-page/details-page';
import { loader } from '../details-page/details-page-loader';

describe('should find and open card details', () => {
  it('event route', async () => {
    const loaderFake = loader;

    const routes = [
      {
        element: <DetailsPage />,
        loader: loaderFake,
        path: '/cards/:cardId',
      },
      {
        element: <Layout />,
        path: '/',
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', '/cards/:cardId'],
      initialIndex: 0,
    });

    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    const searchButton = await screen.findByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();
    await screen.findByRole('button', { name: 'Search' });

    const searchInput = screen.getByPlaceholderText('Search');
    const searchSubmit = screen.getByRole('button', { name: 'Search' });

    await user.type(searchInput, 'arcanine');
    await user.click(searchSubmit);

    const searchResults = await screen.findByText("Blaine's Arcanine");
    expect(searchResults).toBeInTheDocument();

    await user.click(screen.getByText("Blaine's Arcanine"));

    setTimeout(() => {
      expect(screen.getByText("Blaine's Arcanine")).toBeInTheDocument();
    }, 3000);
  });
});
