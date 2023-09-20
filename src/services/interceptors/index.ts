import {Services} from "../index.ts";
import Config from "../../config.ts";

export type Interceptor = {
  onSuccess?: (config: any) => any,
  onError?: (error: any) => any,
}

export const interceptors = {
  checkSuccess:<Interceptor>{
    onAccess:(config) => {
      return config
    },
    onError:async (error) => {
      try {
        const originalRequest = error.config
        const services = new Services(Config)
        if(error.response.status === 401){
          const response  = await services.api.request({
            url:`/api/user/refresh`,
            method:'get'
          })
          
          localStorage.setItem('token', response.data.accessToken)
          
          return services.api.request(originalRequest)
        }
      }catch (e) {
        console.log(e)
      }
    }
  }
}