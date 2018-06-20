import { combineReducers } from 'redux';

// Reducers
import auth from './reducers/auth';
import lobby from './reducers/lobby';
import player from './reducers/player';

export default combineReducers({
  auth,
  lobby,
  player
});
