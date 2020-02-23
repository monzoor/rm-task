import { combineReducers } from 'redux';
import featurePropertiesLists from '../Components/Home/_Reducers/featurePropertiesReducer';
import errors from '../ErrorHandler/ErrorReducers';

export default combineReducers({
    errors,
    featurePropertiesLists,
});
