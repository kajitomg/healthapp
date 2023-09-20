import {Dispatch} from "redux";
import {Services} from "../../index.ts";
import {Page, PagesActionTypes} from "./reducer.ts";
import {ActionOptions, RootState} from "../exports.ts";

export default {
  setPage:(indent:number | string, options?:ActionOptions) => {
    return async (dispatch:Dispatch, getState:RootState, services:Services) => {
      try {
        dispatch({type: PagesActionTypes.PAGES_START})
        let selected:Page = {} as Page
        
        const pages = getState().pages.list.map((page) => {
          page.selected = false
          if(page.id === indent || page.path === indent) {
            page.selected = true
            selected = page
          }
          
          return page
        })
        
        options?.redirect && options?.redirect(selected.path)
        
        dispatch({type: PagesActionTypes.PAGES_SET_PAGES, payload:pages});
      }
      catch (e) {
        dispatch({type:PagesActionTypes.PAGES_ERROR, payload:{errors:e}})
      }
      finally {
        dispatch({type:PagesActionTypes.PAGES_END})
      }
    }
  },
}
