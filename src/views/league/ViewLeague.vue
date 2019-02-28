<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center class="pa-1">
        <div class="display-1 font-weight-medium">
          {{ leagueData.name }}
        </div>
      </v-flex>
      <v-flex xs12 text-xs-center class="pa-1">
        <div class="subheading">
          {{ leagueData.game_type.name }}
        </div>
      </v-flex>
      <v-flex xs12 class="pa-2" text-xs-center>
        <v-btn
          large
          @click="newScoreModalVisible = true"
          color="secondary">New Game</v-btn>
      </v-flex>
      <v-flex xs12 lg10 offset-lg1 class="pa-1">
        <RecentLeagueGames 
          :leagueId="$route.params.id"
          ref="recentLeagueGames"/>
      </v-flex>
      <v-flex xs12 md6 lg4 class="pa-1" v-if="leagueData.team_size > 1">
        <LeagueTeams 
          :leagueId="$route.params.id"
          :leagueTeams="leagueTeams"/>
      </v-flex>
      <v-flex xs12 md6 lg4 class="pa-1">
        <LeagueMembers 
          :members="leagueData.members" />
      </v-flex>
      <v-flex xs12 md6 lg4 class="pa-1">
        <LeagueInvitations 
          :leagueId="$route.params.id"/>
      </v-flex>
    </v-layout>
    <NewScoreModal
      :leagueTeams="leagueTeams"
      :leagueData="leagueData"
      v-if="newScoreModalVisible"
      @close="newScoreModalVisible = false"
      @reloadGames="loadLeagueGames"/>
  </v-container>
</template>

<script>
import axios from "axios";
import RecentLeagueGames from "@/components/league/RecentLeagueGames.vue";
import LeagueTeams from "@/components/league/LeagueTeams.vue";
import LeagueMembers from "@/components/league/LeagueMembers.vue";
import LeagueInvitations from "@/components/league/LeagueInvitations.vue";
import NewScoreModal from "@/components/league/NewScoreModal.vue";

export default {
  name: "ViewLeague",
  components: {
    RecentLeagueGames: RecentLeagueGames,
    LeagueTeams: LeagueTeams,
    LeagueMembers: LeagueMembers,
    LeagueInvitations: LeagueInvitations,
    NewScoreModal: NewScoreModal
  },
  data() {
    return {
      newScoreModalVisible: this.$route.query.newScore,
      leagueData: {
        game_type: {},
        members: []
      },
      leagueTeams: []
    };
  },
  mounted() {
    this.loadLeagueTeams(this.$route.params.id);
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
  },
  methods: {
    loadLeagueTeams(leagueId) {
      axios
        .get(`${process.env.VUE_APP_API_BASE}/api/teams/league/${leagueId}`)
        .then(res => {
          this.leagueTeams = res.data.leagueTeams;
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadLeagueGames() {
      // load games in child component
      this.$refs.recentLeagueGames.loadGames();
    }
  }
};
</script>

<style scoped>
</style>
