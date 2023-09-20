import {Dispatch} from "redux";
import {Services} from "../../index.ts";
import {RoleActionTypes, RoleState,} from "./reducer.ts";
import {ActionOptions, RootState} from "../exports.ts";

export default {
  loadRoles: (options?:ActionOptions) => {
    return async (dispatch:Dispatch, getState:RootState, services:Services) => {
      try {
        dispatch({type:RoleActionTypes.ROLE_START})
        const response = await services.api.request({
          url:`/api/role/roles`,
          method:'get'
        })
        
        dispatch({type: RoleActionTypes.ROLE_SET_ROLES,payload:response.data});
        
        options?.onSuccess && options?.onSuccess()
      }
      catch (e) {
        dispatch({type:RoleActionTypes.ROLE_ERROR,payload:e})
      }
      finally {
        dispatch({type:RoleActionTypes.ROLE_END})
      }
    }
  }
}
