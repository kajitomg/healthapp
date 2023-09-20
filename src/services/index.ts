import createStoreRedux from "./redux";
import {Store} from "redux";
import cfg from '../config.ts'
import APIService from "./api";

class Services {
  config:typeof cfg
  private _redux?:Store
  private _api?:APIService
  constructor(config:typeof cfg) {
    this.config = config
  }
  
  get api() {
    if (!this._api) {
      this._api = new APIService(this, this.config.api,'ru');
    }
    return this._api;
  }
  get redux(){
    if (!this._redux) {
      this._redux = createStoreRedux(this);
    }
    return this._redux;
  }
  
}
export {Services}