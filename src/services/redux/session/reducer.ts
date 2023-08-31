import {EmptyObject} from "redux";

interface IUser {
  id:string
  name:string
  email:string
  roleId:string
}
export enum SessionActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export interface SessionState {
  user: IUser | EmptyObject,
  token: string | null,
  errors: string | null,
  waiting: boolean,
}
interface SignInAction {
  type: SessionActionTypes.SIGN_IN;
  payload: { refreshToken: string, accessToken: string, user:IUser };
}
interface SignOutAction {
  type: SessionActionTypes.SIGN_OUT;
}

export type SessionAction =  SignInAction | SignOutAction

const initialState: SessionState = {
  user: {},
  token: null,
  errors: null,
  waiting: true,
}

function reducer(state: SessionState = initialState, action: SessionAction): SessionState {
  switch (action.type) {
    case SessionActionTypes.SIGN_IN:
      return { ...state};
    case SessionActionTypes.SIGN_OUT:
      return { ...state};
    default:
      return state;
  }
}

export default reducer;
