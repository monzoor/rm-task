import axios from 'axios';

import ErrorDispatch from '../../../ErrorHandler/ErrorDispatcher';

const propertyDetailsAction = id => {
    return dispatch => {
        return axios
            .get(`/api/details/${id}`)
            .then(response => {
                dispatch({
                    type: 'PROPERTY_DETAILS',
                    ...response.data,
                });
            })
            .catch(error => {
                const errorResponse = error.response;
                const errors = {
                    dispatch,
                    ...errorResponse,
                    from: 'propertyDetails',
                };
                if (!errorResponse || errorResponse.status === 500) {
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

export default propertyDetailsAction;
