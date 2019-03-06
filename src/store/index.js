import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import setAuthToken from "@/utils/setAuthToken";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    myLeagues: [],
    loadingLeagues: true,
    myInvitations: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setMyLeagues(state, payload) {
      state.myLeagues = payload;
    },
    setMyInvitations(state, payload) {
      state.myInvitations = payload;
    },
    setLoadingLeagues(state, payload) {
      state.loadingLeagues = payload;
    }
  },
  actions: {
    setCurrentUser({ commit, dispatch }, payload) {
      commit("setUser", payload);
      if (payload === null) {
        commit("setIsAuthenticated", false);
      } else {
        commit("setIsAuthenticated", true);
        dispatch("loadMyLeagues");
      }
    },
    logoutUser({ dispatch }) {
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      dispatch("setCurrentUser", null);
      router.push("/");
    },
    loadMyLeagues({ commit, state }) {
      commit("setLoadingLeagues", true);
      axios
        .get(`${process.env.VUE_APP_API_BASE}/api/leagues`)
        .then(res => {
          if (res.data.success) {
            var loadedLeagues = [];
            res.data.myLeagues.forEach(league => {
              loadedLeagues.push({
                id: league._id,
                name: league.name,
                game_type: league.game_type,
                commissioner: league.commissioner === state.user.id
              });
            });
            commit("setMyLeagues", loadedLeagues);
            commit("setLoadingLeagues", false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadMyInvitations({ commit }) {
      axios
        .get(`${process.env.VUE_APP_API_BASE}/api/invitations/user`)
        .then(res => {
          if (res.data.success) {
            commit("setMyInvitations", res.data.myInvitations);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
