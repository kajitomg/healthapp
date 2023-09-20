import {Services} from "../index.ts";
import cfg from "../../config.ts";
import axios, {Axios} from "axios";
import {Interceptor} from "../interceptors";
import {AxiosRequestConfig} from "axios/index";

type HeadersObject = {
  [K in string] : string
}
type RequestConfig = {
  url:string,
  method:string,
  headers:HeadersObject,
  interceptors:Interceptor[]
}



class APIService {
  
  public services: Services
  private axios:Axios
  private config: typeof cfg.api
  private defaultHeaders:HeadersObject
  constructor(services:Services, config:typeof cfg.api, lang:string) {
    this.services = services;
    this.axios = axios.create({
      withCredentials:true
    })
    this.config = config
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept-Language': lang,
    }
  }

  async request({url, method = 'GET', headers = {},interceptors = [] , ...options}:RequestConfig & AxiosRequestConfig):Promise<{data:any,status:number,headers:any}> {
    if (!url.match(/^(http|\/\/)/)) url = this.config.baseUrl + url;
    this.setInterceptors(interceptors)
    const res = await this.axios.request({
      url,
      method,
      headers: {...this.defaultHeaders, ...headers},
      ...options,
    });
    return {data: await res.data, status: res.status, headers: res.headers};
  }
  
  setHeader(name:string, value:string | null = null):void {
    if (value) {
      this.defaultHeaders[name] = value;
    } else if (this.defaultHeaders[name]) {
      delete this.defaultHeaders[name];
    }
  }
  setInterceptors(interceptors:Interceptor[]){
    interceptors.map((interceptor) => {
      this.axios.interceptors.response.use(interceptor.onSuccess,interceptor.onError)
    })
  }
}

export default APIService;
