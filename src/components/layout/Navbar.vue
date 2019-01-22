<template>
  <nav>
    <v-toolbar dark color="primary">
      <router-link to="/"><v-toolbar-title class="white--text">Leaderboard</v-toolbar-title></router-link>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="!user" flat to="/login">
        Login
        </v-btn>

        <v-btn v-if="!user" flat to="/register">
        Sign Up
        </v-btn>

        <v-btn v-if="user" flat to="/profile">
        Profile
        </v-btn>

        <v-btn v-if="user" flat v-on:click="logout">
        Logout
        </v-btn>
      </v-toolbar-items>

      <v-menu :nudge-width="100" class="hidden-md-and-up">
          <v-toolbar-title slot="activator">
            <v-icon dark>menu</v-icon>
          </v-toolbar-title>
  
          <v-list class="small-menu">
            <v-list-tile v-if="!user">
              <router-link  to="/login"><v-list-tile-title>Login</v-list-tile-title></router-link>
            </v-list-tile>
            <v-list-tile v-if="!user">
              <router-link to="/register"><v-list-tile-title>Sign Up</v-list-tile-title></router-link>
            </v-list-tile>
            <v-list-tile v-if="user">
              <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-if="user" v-on:click="logout">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    user() {
      return this.$store.getters.getUser;
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
.small-menu {
  text-transform: uppercase;
}
</style>
