import { combineReducers } from 'redux';

// Reducers
import auth from './reducers/auth';
import lobby from './reducers/lobby';

export default combineReducers({
  auth,
  lobby
});
