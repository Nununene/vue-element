/**
 * Vue Store
 */

import Vue from 'vue';
import Vuex from 'vuex';

// Root actions, getters and mutations
import * as actions from './rootActions';
import * as getters from './rootGetters';
import * as mutations from './rootMutations';

Vue.use(Vuex);

// Store's state
const state = {
  something: 'world',
  isLoggedIn: false,
  userName: '',
  authInfo: {
    token: '',
    timestamp: '',
    signature: '',
  },
  userId: '',
  errorMsg: '',
  userLang: '',
  unsaved: false,
  runat: new Date().toISOString().replace('T', ' ').replace('Z', ''),
};

export default new Vuex.Store({
  // === Store state ===
  // Store's state = vaiables, global scoped
  state,
  getters,
  actions,
  mutations,
  strict: true,
});
