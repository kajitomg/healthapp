import {EmptyObject} from "redux";

export interface IUser {
  id:string
  name:string
  email:string
  roleId:string
}
export enum SessionActionTypes {
  SIGN_START = 'SIGN_START',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  SIGN_END = 'SIGN_END',
  SIGN_ERROR = 'SIGN_ERROR',
}

export interface SessionState {
  user: IUser | EmptyObject,
  token: string | null,
  errors: any | null,
  exists: boolean,
  waiting: boolean,
}
interface SignStartAction {
  type: SessionActionTypes.SIGN_START;
}
interface SignInAction {
  type: SessionActionTypes.SIGN_IN;
  payload: { refreshToken: string, accessToken: string, user:IUser };
}
interface SignOutAction {
  type: SessionActionTypes.SIGN_OUT;
}
interface SignEndAction {
  type: SessionActionTypes.SIGN_END;
}
interface SignErrorAction {
  type: SessionActionTypes.SIGN_ERROR;
  payload: any
}

export type SessionAction =  SignStartAction | SignInAction | SignOutAction | SignEndAction | SignErrorAction

const initialState: SessionState = {
  user: {},
  token: null,
  errors: null,
  exists: false,
  waiting: true,
}

function reducer(state: SessionState = initialState, action: SessionAction): SessionState {
  switch (action.type) {
    case SessionActionTypes.SIGN_START:
      return {
        ...state,
        waiting:true,
        errors:null
      };
    case SessionActionTypes.SIGN_IN:
      return {
        ...state,
        token:action.payload.accessToken,
        user:action.payload.user,
        exists:true
      };
    case SessionActionTypes.SIGN_OUT:
      return {
        ...state,
        token:null,
        user:{},
        exists:false
      };
    case SessionActionTypes.SIGN_END:
      return {
        ...state,
        waiting:false
      };
    case SessionActionTypes.SIGN_ERROR:
      return {
        ...state,
        errors:action.payload,
        exists:false
      };
    default:
      return state;
  }
}

export default reducer;
