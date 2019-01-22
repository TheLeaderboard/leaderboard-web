import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import setAuthToken from "@/utils/setAuthToken";
import jwtDecode from "jwt-decode";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
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
        .post("http://localhost:5000/api/users/register", userData)
        .then(res => {
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          // set token to auth header
          setAuthToken(token);
          // decode token
          const decoded = jwtDecode(token);
          // set current user
          dispatch("setCurrentUser", decoded);
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
        .post("http://localhost:5000/api/users/login", userData)
        .then(res => {
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          setAuthToken(token);
          const decoded = jwtDecode(token);
          dispatch("setCurrentUser", decoded);
        })
        .catch(err => {
          console.log(err);
        });
    },
    setCurrentUser({ commit }, payload) {
      commit("setUser", payload);
    },
    logoutUser({ dispatch }) {
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      dispatch("setCurrentUser", null);
      router.push("/");
    }
  }
});
