import {createStore} from 'redux';
import reducer from './reducers/appReducer.js';


const store = createStore(reducer, {});

export default store;