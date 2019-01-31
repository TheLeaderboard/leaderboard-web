import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  theme: {
    primary: "#0028FF",
    secondary: "#424242",
    accent: "#FF4A0C",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  },
  iconfont: "md"
});
