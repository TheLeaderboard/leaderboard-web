<template>
  <v-card>
    <v-toolbar color="red lighten-3">
      <v-toolbar-title>Pending Invitations</v-toolbar-title>
    </v-toolbar>
    <v-list two-line>
      <template v-for="(invitation, index) in invitations">
        <v-divider
          v-if="index !== 0"
          :key="`divider${index}`"></v-divider>
        <v-list-tile
          :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{ invitation.league_name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
 name: "MyInvitations",
 props: {
   invitations: {
     type: Array
   }
 },
 async mounted() {
   // populate leagues
  for (const invite in this.invitations) {
    var tempInvite = this.invitations[invite];
    var leagueData = await axios.get(`${process.env.VUE_APP_API_BASE}/api/leagues/${tempInvite.league_id}`);
    this.invitations[invite].league_name = leagueData.data.league.name;
  }
 }
};
</script>

<style scoped>
</style>
