import axios from 'axios';

import ErrorDispatch from '../../../ErrorHandler/ErrorDispatcher';

const featuredPropertiesAction = () => {
    return dispatch => {
        return axios
            .get('/api/allProperties')
            .then(response => {
                dispatch({
                    type: 'FEATURE_PROPERTIES',
                    ...response.data,
                });
            })
            .catch(error => {
                const errorResponse = error.response;
                const errors = {
                    dispatch,
                    ...errorResponse,
                    from: 'featurePropertiesLists',
                };
                if (errorResponse.status === 500) {
                    ErrorDispatch({
                        dispatch,
                        type: 'SERVER_ERROR',
                        ...errors,
                    });
                } else {
                    ErrorDispatch({
                        dispatch,
                        type: 'NOT_FOUND_ERROR',
                        ...errors,
                    });
                }
            });
    };
};

export default featuredPropertiesAction;
