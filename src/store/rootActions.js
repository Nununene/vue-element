// === Actions ===
// Function that trigger(dispatch) by application(or by user action)
// async(promise) procedure is allowed in Actions
// use commit mutation to change store's state

import * as mTypes from './mutation-types';
import * as c from 'src/configuration';
import router from '../router.js';

export const setAuthFromSession = ({ commit }, userInfo) => {
  commit(mTypes.SET_LOGIN_FLAG, true);
  commit(mTypes.SET_LOGIN_INFO, userInfo);
};
export const clearId = ({ commit }) => {
  commit(mTypes.CLEAR_LOGIN_INFO);
  commit(mTypes.SET_LOGIN_FLAG, false);
  commit(mTypes.SET_ERROR_MSG, '');
  router.push({ path: '/login' });
};
export const breakToken = ({ commit }) => {
  commit(mTypes.CLEAR_LOGIN_INFO);
};
export const switchLang = ({ commit }, newLangObj) => {
  c.DEBUG && console.log('New Lang !');
  c.DEBUG && console.log(newLangObj);
  commit(mTypes.SET_USER_LANG, newLangObj.newLang);
};
export const setUnsavedFlag = ({ commit }, newFlag) => {
  c.DEBUG && console.log('Unsaved flag');
  commit(mTypes.SET_UNSAVED_FLAG, newFlag);
};
