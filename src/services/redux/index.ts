import {applyMiddleware, createStore, Store} from "redux";
import thunk from 'redux-thunk';
import {Services} from "../index.ts";
import {rootState} from "./exports";

export default function createStoreRedux(services:Services): Store {
  return createStore(rootState, undefined, applyMiddleware(
    thunk.withExtraArgument(services)
  ));
}
