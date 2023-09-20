
export enum ParamsActionTypes {
  PARAMS_START = 'PARAMS_START',
  PARAMS_END = 'PARAMS_END',
  PARAMS_ERROR = 'PARAMS_ERROR',
}

export interface ParamsState {
  errors:any | null
}
interface ParamsStartAction {
  type: ParamsActionTypes.PARAMS_START;
}
interface ParamsEndAction {
  type: ParamsActionTypes.PARAMS_END;
}
interface ParamsErrorAction {
  type: ParamsActionTypes.PARAMS_ERROR;
  payload: any
}

export type ParamsAction = ParamsStartAction | ParamsEndAction | ParamsErrorAction

const initialState: ParamsState = {
  errors:null
}

function reducer(state: ParamsState = initialState, action: ParamsAction): ParamsState {
  switch (action.type) {
    case ParamsActionTypes.PARAMS_START:
      return {
        ...state,
        errors:null
      };
    case ParamsActionTypes.PARAMS_ERROR:
      return {
        ...state,
        errors:action.payload
      };
    case ParamsActionTypes.PARAMS_END:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default reducer;
