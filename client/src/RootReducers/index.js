import { combineReducers } from 'redux';
import featurePropertiesLists from '../Components/Home/_Reducers/featurePropertiesReducer';
import propertyDetails from '../Components/PropertyDetails/_Reducers/propertyDetailsReducer';
import propertiesList from '../Components/ListItems/_Reducers/propertyListReducers';
import errors from '../ErrorHandler/ErrorReducers';

export default combineReducers({
    errors,
    featurePropertiesLists,
    propertyDetails,
    propertiesList,
});
