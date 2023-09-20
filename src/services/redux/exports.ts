import { default as sessionReducers} from './session/reducer';
import { default as sessionActions } from './session/actions';
import { default as burgerReducers} from './burger/reducer';
import { default as burgerActions } from './burger/actions';
import { default as paramsReducers} from './params/reducer';
import { default as paramsActions } from './params/actions';
import { default as pagesReducers} from './pages/reducer';
import { default as pagesActions } from './pages/actions';
import { default as usersReducers} from './users/reducer';
import { default as usersActions } from './users/actions';
import { default as roleReducers} from './role/reducer';
import { default as roleActions } from './role/actions';
import {combineReducers} from "redux";

export type RootState = () => ReturnType<typeof rootState>
export type ActionOptions = {
  onSuccess?:() => void,
  onError?:() => void,
  redirect?:(path:string) => void
}

const rootState = combineReducers({
  session:sessionReducers,
  burger:burgerReducers,
  params:paramsReducers,
  pages:pagesReducers,
  users:usersReducers,
  role:roleReducers
})
const rootActions = {
  ...sessionActions,
  ...burgerActions,
  ...paramsActions,
  ...pagesActions,
  ...usersActions,
  ...roleActions,
}

export {rootState, rootActions}