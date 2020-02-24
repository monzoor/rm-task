const ErrorDispatch = ({ dispatch, type, from, ...response }) => {
    const errorInfos = {
        status: response.status || null,
        messages: 'data' in response ? response.data.message : null,
        from,
    };

    switch (type) {
        case 'CLEAR_ERROR_MESSAGES': {
            const errorInfo = {};
            return dispatch({ type, errorInfo });
        }
        case 'NOT_FOUND_ERROR': {
            return dispatch({ type, errorInfos });
        }
        case 'SERVER_ERROR': {
            return dispatch({ type, errorInfos });
        }

        default:
            return dispatch({ type, errorInfos });
    }
};
export default ErrorDispatch;
