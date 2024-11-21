import {  legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import userReducer from './user/user.reducer';


const rootReducer = combineReducers({
  users: userReducer
});

const store = createStore(
  rootReducer, 
  applyMiddleware(thunk)
);

export default store;