import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import setAuthToken from "@/utils/setAuthToken";
import jwtDecode from "jwt-decode";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    }
  },
  actions: {
    registerUser({ dispatch }, { name, email, password, password2 }) {
      const userData = {
        name,
        email,
        password,
        password2
      };
      axios
        .post(`${process.env.VUE_APP_API_BASE}/api/users/register`, userData)
        .then(res => {
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          // set token to auth header
          setAuthToken(token);
          // decode token
          const decoded = jwtDecode(token);
          // set current user
          dispatch("setCurrentUser", decoded);
          router.push("/home");
        })
        .catch(err => {
          //handle errors, potentially dispatch an error handling action
          console.log(err);
        });
    },
    loginUser({ dispatch }, { email, password }) {
      const userData = {
        email,
        password
      };
      axios
        .post(`${process.env.VUE_APP_API_BASE}/api/users/login`, userData)
        .then(res => {
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          setAuthToken(token);
          const decoded = jwtDecode(token);
          dispatch("setCurrentUser", decoded);
          router.push("/home");
        })
        .catch(err => {
          console.log(err);
        });
    },
    setCurrentUser({ commit }, payload) {
      commit("setUser", payload);
      if (payload === null) {
        commit("setIsAuthenticated", false);
      } else {
        commit("setIsAuthenticated", true);
      }
    },
    logoutUser({ dispatch }) {
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      dispatch("setCurrentUser", null);
      router.push("/");
    }
  }
});
