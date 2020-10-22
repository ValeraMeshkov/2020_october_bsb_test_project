import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth/index.js";
import users from "./modules/users/index.js";

import state from "./state.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users
  },
  namespaced: true,
  state,
  mutations,
  actions
});
