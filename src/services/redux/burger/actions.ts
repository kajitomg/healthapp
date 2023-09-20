import {Dispatch} from "redux";
import {Services} from "../../index.ts";
import {BurgerActionTypes} from "./reducer.ts";
import {RootState} from "../exports.ts";

export default {
  openBurger:() => {
    return async (dispatch:Dispatch, getState:RootState, services:Services) => {
      try {
        dispatch({type: BurgerActionTypes.BURGER_START})
        
        dispatch({type: BurgerActionTypes.BURGER_OPEN});
      }
      catch (e) {
        dispatch({type:BurgerActionTypes.BURGER_ERROR, payload:{errors:e}})
      }
      finally {
        dispatch({type:BurgerActionTypes.BURGER_END})
      }
    }
  },
  closeBurger:() => {
    return async (dispatch:Dispatch, getState:RootState, services:Services) => {
      try {
        dispatch({type: BurgerActionTypes.BURGER_START})
        
        dispatch({type: BurgerActionTypes.BURGER_CLOSE});
      }
      catch (e) {
        dispatch({type:BurgerActionTypes.BURGER_ERROR, payload:{errors:e}})
      }
      finally {
        dispatch({type:BurgerActionTypes.BURGER_END})
      }
    }
  },
  setBurger:(open:boolean) => {
    return async (dispatch:Dispatch, getState:RootState, services:Services) => {
      try {
        dispatch({type: BurgerActionTypes.BURGER_START})
        
        dispatch({type: BurgerActionTypes.BURGER_SET, payload:open});
      }
      catch (e) {
        dispatch({type:BurgerActionTypes.BURGER_ERROR, payload:{errors:e}})
      }
      finally {
        dispatch({type:BurgerActionTypes.BURGER_END})
      }
    }
  },
}
