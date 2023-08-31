import {applyMiddleware, createStore, EmptyObject, Store} from "redux";
import thunk from 'redux-thunk';
import {Services} from "../index.ts";
import {rootState} from "./exports";
import cfg from '../../config.ts'




export default function createStoreRedux(services:Services, config:typeof cfg | EmptyObject = {}): Store {
  return createStore(rootState, undefined, applyMiddleware(
    thunk.withExtraArgument(services)
  ));
}