<template>
  <v-card>
    <v-toolbar color="red lighten-1">
      <v-toolbar-title>Pending Invitations</v-toolbar-title>
    </v-toolbar>
    <v-list two-line>
      <template v-for="(invitation, index) in myInvitations">
        <v-divider
          v-if="index !== 0"
          :key="`divider${index}`"></v-divider>
        <v-list-tile
          :key="index">
          <v-list-tile-avatar>
            <v-icon
              color="green"
              @click="respondToInvite(invitation, true)">
              check_circle
            </v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ invitation.league_id.name }}</v-list-tile-title>
            <v-list-tile-sub-title>Invited by {{ invitation.inviting_user.username }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon
              color="red"
              @click="respondToInvite(invitation, false)">
              cancel
            </v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "MyInvitations",
  computed: {
    myInvitations() {
      return this.$store.state.myInvitations;
    }
  },
  methods: {
    respondToInvite(invitation, accepted) {
      console.log(invitation);
      // reload invitations
      this.$store.dispatch("loadMyInvitations");
    }
  }
};
</script>

<style scoped>
</style>
