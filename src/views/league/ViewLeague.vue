<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 md6 lg4 class="mx-2">
        <LeagueInvitations 
          :leagueId="this.$route.params.id"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import LeagueInvitations from "@/components/league/LeagueInvitations.vue";

export default {
  name: "ViewLeague",
  components: {
    LeagueInvitations: LeagueInvitations
  },
  data() {
    return {
      leagueData: null
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
          console.log(res.data);
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
