import React from 'react';
import {createMemoryHistory} from 'history';
import {withRouter} from 'react-router';
import {Link, Route, Router, Switch} from 'react-router-dom';
import {render, screen, fireEvent, waitForElement} from '@testing-library/react';

import App from '../../Components/App';

const renderWithRouter = (
    ui,
    {route = '/', history = createMemoryHistory({initialEntries: [route]})} = {},
  ) => {
    return {
      ...render(<Router history={history}>{ui}</Router>),
      // adding `history` to the returned utilities to allow us
      // to reference it in our tests (just try to avoid using
      // this to test implementation details).
      history,
    }
  }

describe('Alll router', () => {
    test('full app rendering/navigating', async () => {
        const {container, getByText} = renderWithRouter(<App />);
        const lazyElement = await waitForElement(() => getByText(/What guests are/i))
        expect(lazyElement).toBeInTheDocument();
        // normally I'd use a data-testid, but just wanted to show this is also possible
        // expect(container.innerHTML).toMatch('What guests are')
        // What guests are
        // const leftClick = {button: 0}
        // fireEvent.click(screen.getByText(/about/i), leftClick)
        // // normally I'd use a data-testid, but just wanted to show this is also possible
        // expect(container.innerHTML).toMatch('You are on the about page')
      })
});
