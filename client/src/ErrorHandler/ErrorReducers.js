const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'NOT_FOUND_ERROR': {
            return {
                ...state,
                ...action.errorInfos,
            };
        }
        case 'SERVER_ERROR': {
            return {
                ...state,
                ...action.errorInfos,
            };
        }

        default:
            return initialState;
    }
}
