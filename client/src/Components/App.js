import React from 'react';
import { Provider } from 'react-redux';

import Routes from '../Routers/Router';
import reduxStore from '../Store';

const App = () => <Routes />;

const ReduxApp = () => (
    <Provider store={reduxStore}>
        <App />
    </Provider>
);
export default ReduxApp;
