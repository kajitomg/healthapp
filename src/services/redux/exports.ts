import {default as sessionReducers} from './session/reducer';
import { default as sessionActions } from './session/actions';
import {combineReducers} from "redux";

const rootState = combineReducers({
  session:sessionReducers
})
const rootActions = {
  ...sessionActions
}

export {rootState, rootActions}