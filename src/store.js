import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  sidebarShow: "responsive",
  sidebarMinimize: false,
  // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impob25AYWRtaW4uY29tIiwidXNlcklkIjoiNjBjYmE5MzMwNDgzZWNjZDZhNWM0ZjYxIiwiaWF0IjoxNjIzOTYxNTc2fQ.FOBrC8aU62IJsvdSyG0GM3F7lp5v-hlAs172gd8kpTo",
  token: "",
  role: "",
};

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarOpened ? false : "responsive";
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarClosed ? true : "responsive";
  },
  set(state, [variable, value]) {
    state[variable] = value;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  currentUserRole(state, payload) {
    state.role = payload;
  },
};

export default new Vuex.Store({
  state,
  mutations,
});
