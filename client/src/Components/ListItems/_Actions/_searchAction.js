import axios from 'axios';

import ErrorDispatch from '../../../ErrorHandler/ErrorDispatcher';

const searchAction = query => {
    return dispatch => {
        return axios
            .get(`/api/search?${query}`)
            .then(response => {
                dispatch({
                    type: 'PROPERTIES_LIST',
                    ...response.data,
                });
            })
            .catch(error => {
                const errorResponse = error.response;
                const errors = {
                    dispatch,
                    ...errorResponse,
                    from: 'propertiesLists',
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

export default searchAction;
