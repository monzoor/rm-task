const initialState = {
    loading: true,
    propertiesList: [],
    paginationInfo: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'PROPERTIES_LIST': {
            return {
                ...state,
                loading: false,
                propertiesList: action.data,
                paginationInfo: action.paginationInfo,
            };
        }
        case 'CLEAR_PROPERTIES_LIST': {
            return {
                loading: true,
                propertiesList: [],
                paginationInfo: {},
            };
        }

        default:
            return state;
    }
}
