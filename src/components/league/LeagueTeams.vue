<template>
  <v-card>
    <v-toolbar color="grey lighten-1">
      <v-toolbar-title>
        Teams
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        v-if="!showList && leagueTeams.length > 0"
        @click="showList = true">
        <v-icon>expand_more</v-icon>
      </v-btn>
      <v-btn
        icon
        v-if="showList && leagueTeams.length > 0"
        @click="showList = false">
        <v-icon>expand_less</v-icon>
      </v-btn>
      <v-btn
        icon
        color="success">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "LeagueTeams",
  data() {
    return {
      showList: true,
      leagueTeams: []
    };
  },
  props: {
    leagueId: {
      type: String
    }
  },
  methods: {
    loadLeagueTeams(leagueId) {
      axios
        .get(`${process.env.VUE_APP_API_BASE}/api/teams/league/${leagueId}`)
        .then(res => {
          console.log(res);
          this.leagueTeams = res.data.leagueTeams;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadLeagueTeams(this.leagueId);
  }
};
</script>

<style scoped>
</style>
