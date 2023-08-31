import {TypedUseSelectorHook, useSelector} from "react-redux";
import {rootState} from "../exports.ts";

const useTypedSelector:TypedUseSelectorHook<ReturnType<typeof rootState>> = useSelector

export {useTypedSelector}