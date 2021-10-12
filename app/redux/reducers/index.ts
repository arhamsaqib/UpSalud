import {combineReducers} from 'redux';
import Current from './CurrentUserReducerRedux';
// import {LoginCredentialReducer} from './CurrentUserReducerRedux';

export const allReducers = combineReducers({
  CurrentUser: Current,
  // UserLogin: LoginCredentialReducer,
});
