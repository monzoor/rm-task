import axios from 'axios';

import { qstringCreator } from '../../../Utils/Utils';
import ErrorDispatch from '../../../ErrorHandler/ErrorDispatcher';

const searchAction = (query, clearAll) => {
    const searchString = qstringCreator(query);
    // console.log('--sddsd--', searchString);

    return dispatch => {
        if (clearAll) {
            dispatch({
                type: 'CLEAR_PROPERTIES_LIST',
            });
        }

        return axios
            .get(
                `${
                    searchString ? `/api/search?${searchString}` : '/api/search'
                }`
            )
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
