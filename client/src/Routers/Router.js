import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import history from '../Utils/history';
import { Spinner } from '../Utils/Loader';
import routes from './RouterConfig';

// For testing
const LocationDisplay = withRouter(({ location }) => (
    <div className="d-none" data-testid="location-display">
        {location.pathname}
    </div>
));

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
    const status = Object.values({ ...rest.location.state })[0];

    if (status === 404) {
        return (
            <Route
                {...rest}
                render={props => (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )}
            />
        );
    }
    return (
        <Route
            {...rest}
            render={props => (
                <React.Suspense fallback={<Spinner />}>
                    <Layout>
                        <Component {...props} />
                    </Layout>
                </React.Suspense>
            )}
        />
    );
};
AppRoute.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
    ]).isRequired,
    layout: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
    ]).isRequired,
};
const Switches = () => (
    <Router history={history}>
        <div>
            <Switch>
                {routes.map((route, i) => (
                    <AppRoute
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                        layout={route.layout}
                        status={route.layout || null}
                    />
                ))}
            </Switch>
            <LocationDisplay />
        </div>
    </Router>
);

export default Switches;
