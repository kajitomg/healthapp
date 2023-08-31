import createStoreRedux from "./redux";
import {Store} from "redux";
import cfg from '../config.ts'

class Services {
  config:typeof cfg
  private _redux?:Store
  constructor(config:typeof cfg) {
    this.config = config
  }
  
  get redux(){
    if (!this._redux) {
      this._redux = createStoreRedux(this, this.config.redux);
    }
    return this._redux;
  }
  
}
export {Services}