<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="primary darken-4" dark disable-resize-watcher>
      <v-list>
        <div v-if="!isAuthenticated">
          <v-list-tile to="/login">
            <v-list-tile-content>
              Login
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/register">
            <v-list-tile-content>
              Sign Up
            </v-list-tile-content>
          </v-list-tile>
        </div>
        <div v-if="isAuthenticated">
          <v-list-tile to="/home">
            <v-list-tile-content>
              Home
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/profile">
            <v-list-tile-content>
              Profile
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-content>
              Logout
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="primary darken-2" dark dense flat>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer =!drawer"></v-toolbar-side-icon>
      <!-- <v-spacer class="hidden-md-and-up"></v-spacer> -->
      <router-link to="/">
        <v-toolbar-title class="text-uppercase">{{ appTitle }}</v-toolbar-title>
      </router-link>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn flat to="/login">Login</v-btn>
        <v-btn color="primary lighten-1" to="/register">Sign Up</v-btn>
      </div>
      <div v-if="isAuthenticated" class="hidden-sm-and-down">
        <v-btn flat to="/home">Home</v-btn>
        <v-btn flat to="/profile">Profile</v-btn>
        <v-btn outline @click="logout">Logout</v-btn>
      </div>
    </v-toolbar>
  </span>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      appTitle: process.env.VUE_APP_TITLE,
      drawer: false
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>
