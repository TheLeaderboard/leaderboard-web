import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import "./registerServiceWorker";
import jwtDecode from "jwt-decode";
import setAuthToken from "@/utils/setAuthToken";

Vue.config.productionTip = false;

if (localStorage.jwtToken) {
  // set auth token header
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // decode token
  const decoded = jwtDecode(token);
  // set user
  store.dispatch("setCurrentUser", decoded);
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch("logoutUser");
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
