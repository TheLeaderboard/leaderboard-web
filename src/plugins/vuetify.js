import Vue from "vue";
import Vuetify, { VLayout } from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import "../stylus/main.styl";

Vue.use(Vuetify, {
  components: {
    VLayout
  },
  theme: {
    primary: "#004865",
    secondary: "#D15F6E",
    accent: "#5DA0Bf",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  },
  iconfont: "md"
});
