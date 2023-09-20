
export enum BurgerActionTypes {
  BURGER_START = 'BURGER_START',
  BURGER_OPEN = 'BURGER_OPEN',
  BURGER_CLOSE = 'BURGER_CLOSE',
  BURGER_SET = 'BURGER_SET',
  BURGER_END = 'BURGER_END',
  BURGER_ERROR = 'BURGER_ERROR',
}

export interface BurgerState {
  open:boolean,
  errors: any | null,
}
interface BurgerStartAction {
  type: BurgerActionTypes.BURGER_START;
}
interface BurgerOpenAction {
  type: BurgerActionTypes.BURGER_OPEN;
}
interface BurgerCloseAction {
  type: BurgerActionTypes.BURGER_CLOSE;
}
interface BurgerSetAction {
  type: BurgerActionTypes.BURGER_SET;
  payload: boolean
}
interface BurgerEndAction {
  type: BurgerActionTypes.BURGER_END;
}
interface BurgerErrorAction {
  type: BurgerActionTypes.BURGER_ERROR;
  payload: any
}

export type BurgerAction = BurgerStartAction | BurgerOpenAction | BurgerCloseAction | BurgerEndAction | BurgerErrorAction | BurgerSetAction

const initialState: BurgerState = {
  open:false,
  errors:null
}

function reducer(state: BurgerState = initialState, action: BurgerAction): BurgerState {
  switch (action.type) {
    case BurgerActionTypes.BURGER_START:
      return {
        ...state,
        errors:null
      };
    case BurgerActionTypes.BURGER_OPEN:
      return {
        ...state,
        open:true
      };
    case BurgerActionTypes.BURGER_CLOSE:
      return {
        ...state,
        open:false
      };
    case BurgerActionTypes.BURGER_SET:
      return {
        ...state,
        open:action.payload
      };
    case BurgerActionTypes.BURGER_ERROR:
      return {
        ...state,
        errors:action.payload
      };
    case BurgerActionTypes.BURGER_END:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default reducer;
