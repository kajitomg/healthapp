import {IUser} from "../session/reducer.ts";


export enum UsersActionTypes {
  USERS_START = 'USERS_START',
  USERS_SET = 'USERS_SET',
  USERS_ADD = 'USERS_ADD',
  USERS_END = 'USERS_END',
  USERS_ERROR = 'USERS_ERROR',
}

export interface UsersState {
  list:IUser[]
  errors:any | null,
  waiting:boolean
}
interface UsersStartAction {
  type: UsersActionTypes.USERS_START;
}

interface UsersSetAction {
  type: UsersActionTypes.USERS_SET;
  payload: IUser[]
}

interface UsersAddAction {
  type: UsersActionTypes.USERS_ADD;
  payload: IUser[]
}

interface UsersEndAction {
  type: UsersActionTypes.USERS_END;
}
interface UsersErrorAction {
  type: UsersActionTypes.USERS_ERROR;
  payload: any
}

export type UsersAction = UsersStartAction | UsersEndAction | UsersErrorAction | UsersSetAction | UsersAddAction

const initialState: UsersState = {
  list:[],
  errors:null,
  waiting:false
}

function reducer(state: UsersState = initialState, action: UsersAction): UsersState {
  switch (action.type) {
    case UsersActionTypes.USERS_START:
      return {
        ...state,
        waiting:true,
        errors:null
      };
    case UsersActionTypes.USERS_SET:
      return {
        ...state,
        list:action.payload
      };
    case UsersActionTypes.USERS_ADD:
      return {
        ...state,
        list:[...state.list, ...action.payload]
      };
    case UsersActionTypes.USERS_ERROR:
      return {
        ...state,
        errors:action.payload
      };
    case UsersActionTypes.USERS_END:
      return {
        ...state,
        waiting:false,
      };
    default:
      return state;
  }
}

export default reducer;
