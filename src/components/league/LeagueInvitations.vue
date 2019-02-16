<template>
  <v-card>
    <v-toolbar color="primary lighten-2">
      <v-toolbar-title>
        {{ leagueInvitations.length > 0 ? "Pending Invitations" : "Invite a Friend" }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="showInvitationModal">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list 
      v-if="leagueInvitations.length > 0"
      two-line>
      <template v-for="(invitation, index) in leagueInvitations">
        <v-divider
          v-if="index !== 0"
          :key="`divider${index}`"></v-divider>
        <v-list-tile
          :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{ invitation.invited_email }}</v-list-tile-title>
            <v-list-tile-sub-title>Invited by {{ invitation.inviting_user.username }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "LeagueInvitations",
  props: {
    leagueId: {
      type: String
    }
  },
  data() {
    return {
      leagueInvitations: []
    };
  },
  methods: {
    loadLeagueInvitations(leagueId) {
      axios
        .get(
          `${process.env.VUE_APP_API_BASE}/api/invitations/league/${leagueId}`
        )
        .then(res => {
          this.leagueInvitations = res.data.leagueInvitations;
        })
        .catch(err => {
          console.log(err);
        });
    },
    showInvitationModal() {
      //
    }
  },
  mounted() {
    this.loadLeagueInvitations(this.leagueId);
  }
};
</script>

<style scoped>
</style>
