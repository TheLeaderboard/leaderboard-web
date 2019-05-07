<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center class="pa-1">
        <div class="display-1 font-weight-medium">
          <SkeletonBox v-if="loadingData" width="30%"/>
          {{ leagueData.name }}
        </div>
      </v-flex>
      <v-flex xs12 text-xs-center class="pa-1">
        <div class="subheading">
          <SkeletonBox v-if="loadingData" width="20%" />
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
          :loading="loadingTeams"
          :leagueId="$route.params.id"
          :leagueTeams="leagueTeams"/>
      </v-flex>
      <v-flex xs12 md6 lg4 class="pa-1">
        <LeagueMembers
          :loading="loadingData"
          :members="leagueData.members" />
      </v-flex>
      <v-flex xs12 md6 lg4 class="pa-1">
        <LeagueInvitations 
          :leagueId="$route.params.id"
          :commissionerAccess="userIsCommissioner"/>
      </v-flex>
    </v-layout>
    <NewScoreModal
      :leagueTeams="leagueTeams"
      :leagueData="leagueData"
      :loadingData="loadingData"
      :loadingTeams="loadingTeams"
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
import SkeletonBox from "@/components/layout/SkeletonBox.vue";

export default {
  name: "ViewLeague",
  components: {
    RecentLeagueGames,
    LeagueTeams,
    LeagueMembers,
    LeagueInvitations,
    NewScoreModal,
    SkeletonBox
  },
  data() {
    return {
      newScoreModalVisible: this.$route.query.newScore,
      leagueData: {
        game_type: {},
        members: []
      },
      leagueTeams: [],
      loadingData: true,
      loadingTeams: true
    };
  },
  async mounted() {
    this.loadLeagueTeams(this.$route.params.id);
    this.loadLeagueData(this.$route.params.id);
  },
  methods: {
    sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    },
    loadLeagueTeams(leagueId) {
      axios
        .get(`${process.env.VUE_APP_API_BASE}/api/teams/league/${leagueId}`)
        .then(res => {
          this.leagueTeams = res.data.leagueTeams;
          this.loadingTeams = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async loadLeagueData(leagueId) {
      axios
        .get(`${process.env.VUE_APP_API_BASE}/api/leagues/${leagueId}`)
        .then(res => {
          if (res.data.success) {
            this.leagueData = res.data.league;
            this.loadingData = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadLeagueGames() {
      // load games in child component
      this.$refs.recentLeagueGames.loadGames();
    }
  },
  watch: {
    "$route.query.newScore": function(newScore) {
      this.newScoreModalVisible = newScore;
    },
    "$route.params.id": async function(id) {
      await this.loadLeagueData(id);
      this.loadLeagueTeams(id);
      this.loadLeagueGames();
      this.newScoreModalVisible = this.$route.query.newScore;
    }
  },
  computed: {
    userIsCommissioner() {
      return this.leagueData.commissioner === this.$store.state.user.id;
    }
  }
};
</script>

<style scoped>
</style>
