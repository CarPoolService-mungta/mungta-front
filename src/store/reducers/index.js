// third-party
import { combineReducers } from 'redux';

// project import
import menu     from './menu';
import userInfo from './userInfo';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, userInfo });

export default reducers;
