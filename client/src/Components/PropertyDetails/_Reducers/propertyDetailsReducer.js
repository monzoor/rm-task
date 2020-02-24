const initialState = {
    loading: true,
    details: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'PROPERTY_DETAILS': {
            return {
                ...state,
                loading: false,
                details: action.data,
            };
        }

        default:
            return state;
    }
}
