import React from 'react';
import { createMemoryHistory } from 'history';
import { withRouter } from 'react-router';
import { Link, Route, Router, Switch } from 'react-router-dom';
import {
    render,
    screen,
    fireEvent,
    waitForElement,
} from '@testing-library/react';

import App from '../../Components/App';

const renderWithRouter = (
    ui,
    {
        route = '/',
        history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
) => {
    return {
        ...render(<Router history={history}>{ui}</Router>),
        history,
    };
};

describe('All router', () => {
    test('Home page suspanse is working', () => {
        const { container } = renderWithRouter(<App />);
        expect(container.innerHTML).toMatch('loading..');
    });
    test('Home page rendered after suspanse', async () => {
        const { getByText } = renderWithRouter(<App />);
        const lazyElement = await waitForElement(() =>
            getByText(/What guests are saying about home in the/i)
        );
        expect(lazyElement).toBeInTheDocument();
    });
});
