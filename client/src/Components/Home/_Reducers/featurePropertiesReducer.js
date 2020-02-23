const initialState = {
    loading: true,
    properties: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'FEATURE_PROPERTIES': {
            return {
                ...state,
                loading: false,
                properties: action.data,
            };
        }

        default:
            return state;
    }
}
