<template>
  <div>
    <v-card>
      <v-toolbar color="grey lighten-1">
        <v-toolbar-title>
          {{ leagueInvitations.length > 0 ? "Pending Invitations" : "Invite a Friend" }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          v-if="!showList && leagueInvitations.length > 0"
          @click="showList = true">
          <v-icon>expand_more</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="showList && leagueInvitations.length > 0"
          @click="showList = false">
          <v-icon>expand_less</v-icon>
        </v-btn>
        <v-btn
          icon
          color="success"
          @click="isModalVisible = true">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list 
        v-if="leagueInvitations.length > 0 && showList"
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
    <AddInviteModal 
      v-show="isModalVisible"
      :leagueId="leagueId"
      @close="isModalVisible = false" 
      @reloadInvites="loadLeagueInvitations(leagueId)"/>
  </div>
</template>

<script>
import axios from "axios";
import AddInviteModal from "@/components/league/AddInviteModal.vue";

export default {
  name: "LeagueInvitations",
  components: {
    AddInviteModal: AddInviteModal
  },
  props: {
    leagueId: {
      type: String
    }
  },
  data() {
    return {
      isModalVisible: false,
      showList: true,
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
    }
  },
  mounted() {
    this.loadLeagueInvitations(this.leagueId);
  }
};
</script>

<style scoped>
</style>
