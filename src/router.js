import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import store from "@/store";
import Landing from "@/views/Landing.vue";
import CreateLeague from "@/views/league/CreateLeague.vue";
import ViewLeague from "@/views/league/ViewLeague.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/league/create",
      name: "leagueCreate",
      component: CreateLeague,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/league/:id",
      name: "leagueView",
      component: ViewLeague,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = store.getters.getIsAuthenticated;
  const guest = to.matched.some(record => record.meta.guest);

  if (requiresAuth && !isAuthenticated) {
    next("login");
  } else if (guest && isAuthenticated) {
    next("home");
  } else {
    next();
  }
});

export default router;
