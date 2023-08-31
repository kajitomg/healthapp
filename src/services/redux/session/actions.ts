import {Dispatch} from "redux";
import {Services} from "../../index.ts";
import {SessionActionTypes, SessionState} from "./reducer.ts";

export default {
  signin: () => {
    return (dispatch:Dispatch, getState:SessionState, services:Services) => {
      dispatch({type: SessionActionTypes.SIGN_IN,payload:{}});
    }
  }
}
