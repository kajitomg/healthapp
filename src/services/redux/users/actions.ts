import {Dispatch} from "redux";
import {Services} from "../../index.ts";
import {UsersActionTypes} from "./reducer.ts";
import {ActionOptions, RootState} from "../exports.ts";

export type CreateAccountData = {
  email:string,
  password:string,
  name?:string,
  role?:string
}
export default {
  loadUsers: () => {
    return async (dispatch:Dispatch, getState:RootState, services:Services) => {
      try {
        dispatch({type:UsersActionTypes.USERS_START})
        const response = await services.api.request({
          url:`/api/user/users`,
          method:'get'
        })
        
        dispatch({type: UsersActionTypes.USERS_SET,payload:response.data});
        
      }
      catch (e) {
        dispatch({type:UsersActionTypes.USERS_ERROR,payload:{errors:e}})
      }
      finally {
        dispatch({type:UsersActionTypes.USERS_END})
      }
    }
  },
  createUser: (data:CreateAccountData,options?:ActionOptions) => {
    return async (dispatch:Dispatch, getState:RootState, services:Services) => {
      try {
        dispatch({type:UsersActionTypes.USERS_START})
        const response = await services.api.request({
          url:`/api/user/create`,
          method:'post',
          data:JSON.stringify(data)
        })
        dispatch({type: UsersActionTypes.USERS_ADD,payload:[response.data.user]});
        options?.onSuccess && options?.onSuccess()
      }
      catch (e) {
        dispatch({type:UsersActionTypes.USERS_ERROR,payload:{errors:e}})
        options?.onError && options?.onError()
      }
      finally {
        dispatch({type:UsersActionTypes.USERS_END})
      }
    }
  },
}
