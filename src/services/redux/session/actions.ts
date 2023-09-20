import {Dispatch} from "redux";
import {Services} from "../../index.ts";
import {SessionActionTypes} from "./reducer.ts";
import {ActionOptions, RootState} from "../exports.ts";

export type SessionSignInData = {
  email:string,
  password:string
}

export default {
  signin: (data:SessionSignInData,options:ActionOptions) => {
    return async (dispatch:Dispatch, getState:RootState, services:Services) => {
      try {
        dispatch({type:SessionActionTypes.SIGN_START})
        const response = await services.api.request({
          url:`/api/user/login`,
          method:'post',
          data:JSON.stringify(data)
        })
        
        localStorage.setItem('token', response.data.accessToken)
        
        services.api.setHeader('Authorization', response.data.accessToken)
        
        dispatch({type: SessionActionTypes.SIGN_IN,payload:response.data});
        
        options?.onSuccess && options?.onSuccess()
      }
      catch (e) {
        dispatch({type:SessionActionTypes.SIGN_ERROR,payload:e})
      }
      finally {
        dispatch({type:SessionActionTypes.SIGN_END})
      }
    }
  },
  signout: () => {
    return async (dispatch: Dispatch, getState:RootState, services: Services) => {
      try {
        dispatch({type:SessionActionTypes.SIGN_START})
        
        await services.api.request({
          url:'/api/user/logout',
          method:'post'
        })
        
        localStorage.removeItem('token')
        
        services.api.setHeader('Authorization', null)
        
        dispatch({type:SessionActionTypes.SIGN_OUT})
        
      } catch (e) {
        dispatch({type: SessionActionTypes.SIGN_ERROR, payload: e})
      } finally {
        dispatch({type: SessionActionTypes.SIGN_END})
      }
    }
  },
  remind: (options?:ActionOptions) => {
    return async (dispatch:Dispatch, getState:RootState, services:Services) => {
      try {
        dispatch({type:SessionActionTypes.SIGN_START})
        
        const response = await services.api.request({
          url:`/api/user/refresh`,
          method:'get'
        })
        
        localStorage.setItem('token', response.data.accessToken)
        
        services.api.setHeader('Authorization', response.data.accessToken)
        
        dispatch({type: SessionActionTypes.SIGN_IN,payload:response.data});
        
        options?.onSuccess && options?.onSuccess()
      }
      catch (e) {
        dispatch({type:SessionActionTypes.SIGN_ERROR,payload:e})
      }
      finally {
        dispatch({type:SessionActionTypes.SIGN_END})
      }
    }
  }
}
