import { combineReducers } from 'redux';
import auth from './auth';
import subscribes from './subscribes';

const rootReducer = combineReducers({
  auth,
  subscribes,
});

export default rootReducer;
