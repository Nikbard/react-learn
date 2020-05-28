import {combineReducers} from 'redux'
import quizeReducer from './quiz';
import createReduser from './create';
import authReducer from './auth';

export default combineReducers({
    quiz: quizeReducer,
    create: createReduser,
    auth: authReducer
});