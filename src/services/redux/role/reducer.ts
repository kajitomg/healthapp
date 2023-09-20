
export interface IRole {
  id:string;
  name:string;
  level:string;
}
export enum RoleActionTypes {
  ROLE_START = 'ROLE_START',
  ROLE_END = 'ROLE_END',
  ROLE_ERROR = 'ROLE_ERROR',
  ROLE_SET_ROLES = 'ROLE_SET_ROLES'
}

export interface RoleState {
  list: IRole[],
  errors: any | null,
  waiting: boolean,
}
interface RoleStartAction {
  type: RoleActionTypes.ROLE_START;
}

interface RoleSetRolesAction {
  type: RoleActionTypes.ROLE_SET_ROLES;
  payload: IRole[]
}
interface RoleEndAction {
  type: RoleActionTypes.ROLE_END;
}
interface RoleErrorAction {
  type: RoleActionTypes.ROLE_ERROR;
  payload: any
}

export type RoleAction =  RoleStartAction | RoleEndAction | RoleErrorAction | RoleSetRolesAction

const initialState: RoleState = {
  list: [],
  errors: null,
  waiting: false,
}

function reducer(state: RoleState = initialState, action: RoleAction): RoleState {
  switch (action.type) {
    case RoleActionTypes.ROLE_START:
      return {
        ...state,
        waiting:true,
        errors:null
      };
    case RoleActionTypes.ROLE_SET_ROLES:
      return {
        ...state,
        list:action.payload
      };
    case RoleActionTypes.ROLE_END:
      return {
        ...state,
        waiting:false
      };
    case RoleActionTypes.ROLE_ERROR:
      return {
        ...state,
        errors:action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
