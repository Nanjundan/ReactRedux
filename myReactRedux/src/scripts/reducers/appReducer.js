import {combineReducers} from 'redux';
import userReducer from './userReducer.js';
import surveyReducer from './surveyReducer.js';

export default combineReducers({
    userReducer,
    surveyReducer
});