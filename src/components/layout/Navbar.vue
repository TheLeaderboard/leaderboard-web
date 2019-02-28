<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="primary darken-2" dark disable-resize-watcher>
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
    <v-toolbar app color="primary darken-1" dark dense flat>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer =!drawer"></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title class="text-uppercase">{{ appTitle }}</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn flat to="/login">Login</v-btn>
        <v-btn color="primary lighten-1" to="/register">Sign Up</v-btn>
      </div>
      <div v-if="isAuthenticated && myLeagues.length > 0">
        <v-menu offset-y>
          <v-btn
            slot="activator"
            icon>
            <v-icon>add_box</v-icon>
          </v-btn>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title
                  class="font-weight-bold">
                  New Game
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile
              v-for="(league, index) in myLeagues"
              :key="index"
              :to="`/league/${league.id}?newScore=true`">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ league.name }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
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
    },
    myLeagues() {
      return this.$store.state.myLeagues;
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
