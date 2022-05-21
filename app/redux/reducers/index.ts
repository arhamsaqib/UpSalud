import {combineReducers} from 'redux';
import Current from './CurrentUserReducerRedux';
import rememberMereducer from './rememberMeReducer';
// import {LoginCredentialReducer} from './CurrentUserReducerRedux';

export const allReducers = combineReducers({
  CurrentUser: Current,
  rememberMe: rememberMereducer,
  // UserLogin: LoginCredentialReducer,
});
