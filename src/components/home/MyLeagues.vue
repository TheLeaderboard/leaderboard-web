<template>
  <v-card>
    <v-toolbar color="grey lighten-3" elevation="3">
      <v-toolbar-title>My Leagues</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <v-btn icon slot="activator">
          <v-icon>add</v-icon>
        </v-btn>
        <span>Create new league</span>
      </v-tooltip>
    </v-toolbar>
    <v-list two-line>
      <v-list-tile v-if="leagues.length === 0">
        <v-list-tile-title>No leagues yet</v-list-tile-title>
      </v-list-tile>
      <template v-for="(league, index) in leagues">
        <v-divider
          v-if="index !== 0"
          :key="`divider${index}`"></v-divider>
        <v-list-tile
          :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{ league.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ league.teamName }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "MyLeagues",
  data() {
    return {
      leagues: [
        {
          id: "1",
          name: "Euchre Pros",
          teamName: "SteenEngine",
          game: "Euchre"
        }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style scoped>
</style>
