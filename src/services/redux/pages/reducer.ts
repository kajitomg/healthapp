
export interface Page {
  id:number,
  name:string,
  selected:boolean,
  path:string
}

const pages:Page[] = [
  {id:1,name:'Главная',selected:false,path:'/'},
  {id:2,name:'Товары',selected:false,path:'/products'},
  {id:3,name:'Пользователи',selected:false,path:'/users'},
]
export enum PagesActionTypes {
  PAGES_START = 'PAGES_START',
  PAGES_SET_PAGES= 'PAGES_SET_PAGES',
  PAGES_END = 'PAGES_END',
  PAGES_ERROR = 'PAGES_ERROR',
}

export interface PagesState {
  list:Page[];
  errors:any | null
}
interface PagesStartAction {
  type: PagesActionTypes.PAGES_START;
}

interface PagesSetPagesAction {
  type: PagesActionTypes.PAGES_SET_PAGES;
  payload:Page[]
}
interface PagesEndAction {
  type: PagesActionTypes.PAGES_END;
}
interface PagesErrorAction {
  type: PagesActionTypes.PAGES_ERROR;
  payload: any
}

export type PagesAction = PagesStartAction | PagesSetPagesAction | PagesEndAction | PagesErrorAction

const initialState: PagesState = {
  list:pages,
  errors:null
}

function reducer(state: PagesState = initialState, action: PagesAction): PagesState {
  switch (action.type) {
    case PagesActionTypes.PAGES_START:
      return {
        ...state,
        errors:null
      };
    case PagesActionTypes.PAGES_SET_PAGES:
      return {
        ...state,
        list:action.payload
      };
    case PagesActionTypes.PAGES_ERROR:
      return {
        ...state,
        errors:action.payload
      };
    case PagesActionTypes.PAGES_END:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default reducer;
