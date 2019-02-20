<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center class="pa-2">
        <div class="display-1 font-weight-medium">
          {{ leagueData.name }}
        </div>
      </v-flex>
      <v-flex xs12 text-xs-center class="pa-2">
        <div class="subheading">
          {{ leagueData.game_type.name }}
        </div>
      </v-flex>
      <v-flex xs12 md6 lg4 class="pa-2">
        <LeagueMembers 
          :members="leagueData.members" />
      </v-flex>
      <v-flex xs12 md6 lg4 class="pa-2">
        <LeagueInvitations 
          :leagueId="this.$route.params.id"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import LeagueMembers from "@/components/league/LeagueMembers.vue";
import LeagueInvitations from "@/components/league/LeagueInvitations.vue";

export default {
  name: "ViewLeague",
  components: {
    LeagueMembers: LeagueMembers,
    LeagueInvitations: LeagueInvitations
  },
  data() {
    return {
      leagueData: {
        game_type: {},
        members: []
      }
    };
  },
  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_API_BASE}/api/leagues/${this.$route.params.id}`
      )
      .then(res => {
        if (res.data.success) {
          this.leagueData = res.data.league;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>
