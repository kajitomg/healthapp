import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {rootActions} from "../exports.ts";

const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(rootActions,dispatch)
}
export {useActions}