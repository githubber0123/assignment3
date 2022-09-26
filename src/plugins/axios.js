"use strict";

import Vue from "vue";
import axios from "axios";
// import store from "../store";

let token = JSON.parse(JSON.stringify(sessionStorage.getItem("setToken")));
axios.defaults.headers.common["Authorization"] = token;
axios.defaults.baseURL = process.env.VUE_APP_SERVER_ADDRESS;

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post["Content-Type"] = "text/json";

// if (token) {
//   axios.defaults.headers.common["Token"] = JSON.parse(localStorage.getItem("user")).Token;
// }

let config = {
  baseURL: process.env.VUE_APP_SERVER_ADDRESS,
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  // contentType: "text/json",
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(res) {
    // Check token status
    // if (res.data.Msg === "TokenExpired") {
    //   // return to login page if token is expired
    //   console.error("Token is expired.");
    //   router.replace("/login");
    //   // return store.dispatch('auth/logout');
    // }
    return res;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
