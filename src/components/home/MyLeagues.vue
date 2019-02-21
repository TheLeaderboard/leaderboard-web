<template>
  <v-card>
    <v-toolbar color="grey lighten-1" elevation="3">
      <v-toolbar-title>My Leagues</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/league/create" color="success">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list two-line>
      <v-list-tile v-if="myLeagues.length === 0">
        <v-list-tile-title>No leagues yet</v-list-tile-title>
      </v-list-tile>
      <template v-for="(league, index) in myLeagues">
        <v-divider
          v-if="index !== 0"
          :key="`divider${index}`"></v-divider>
        <v-list-tile
          :key="index"
          :to="`/league/${league.id}`">
          <v-list-tile-avatar>
            <v-tooltip top>
              <v-icon
                slot="activator"
                v-if="league.commissioner">supervisor_account</v-icon>
              <span>You manage this league</span>
            </v-tooltip>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ league.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ league.teamName }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-badge v-show="false" left>
              <span slot="badge">2</span>
              <v-icon>
                chat
              </v-icon>
            </v-badge>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "MyLeagues",
  computed: {
    myLeagues() {
      return this.$store.state.myLeagues;
    }
  },
  mounted() {
    this.$store.dispatch("loadMyLeagues");
  }
};
</script>

<style scoped>
</style>
