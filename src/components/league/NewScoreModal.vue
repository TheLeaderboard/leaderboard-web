<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <v-layout align-center justify-center>
        <v-flex xs12 md8 lg6 class="pa-2">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark dense flat>
              <v-toolbar-title>New Game</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-layout column>
                <v-layout wrap v-if="leagueData.team_size !== 1" align-center>
                  <v-flex xs12 class="pa-1 text-xs-center">
                    <div class="subheading">Teams</div>
                  </v-flex>
                  <v-flex xs12 md5 class="pa-1">
                    <v-select
                      v-model="homeTeam"
                      :items="homeTeams"
                      :loading="loadingTeams"
                      no-data-text="No teams available"
                      item-text="name"
                      item-value="_id"
                      label="Home team"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 md2 class="pa-2 text-xs-center">
                    <div class="subheading text-uppercase font-weight-bold">
                      vs
                    </div>
                  </v-flex>
                  <v-flex xs12 md5 class="pa-1">
                    <v-select
                      v-model="awayTeam"
                      :items="awayTeams"
                      :loading="loadingTeams"
                      no-data-text="No teams available"
                      item-text="name"
                      item-value="_id"
                      label="Away team"
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout wrap v-if="leagueData.team_size === 1" align-center>
                  <v-flex xs12 class="pa-1 text-xs-center">
                    <div class="subheading">Players</div>
                  </v-flex>
                  <v-flex xs12 md5 class="pa-1">
                    <v-select
                      v-model="homeTeam"
                      :items="homePlayers"
                      :loading="loadingData"
                      no-data-text="No players available"
                      item-text="username"
                      item-value="_id"
                      label="Player one"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 md2 class="pa-1 text-xs-center">
                    <div class="subheading text-uppercase font-weight-bold">
                      vs
                    </div>
                  </v-flex>
                  <v-flex xs12 md5 class="pa-1">
                    <v-select
                      v-model="awayTeam"
                      :items="awayPlayers"
                      :loading="loadingData"
                      no-data-text="No players available"
                      item-text="username"
                      item-value="_id"
                      label="Player two"
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout
                  wrap
                  align-center
                  v-show="areTeamsSelected && !leagueData.win_loss_only"
                  class="hidden-sm-and-down"
                >
                  <v-flex xs12 class="pa-1 text-xs-center">
                    <div class="subheading">Score</div>
                  </v-flex>
                  <v-flex xs12 md5 class="pa-1 text-xs-center">
                    <v-text-field
                      type="number"
                      v-model="homeScore"
                      min="0"
                      step="1"
                      :rules="scoreRules"
                      outline
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md2 class="pa-1"></v-flex>
                  <v-flex xs12 md5 class="pa-1 text-xs-center">
                    <v-text-field
                      type="number"
                      v-model="awayScore"
                      min="0"
                      step="1"
                      :rules="scoreRules"
                      outline
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout
                  wrap
                  align-center
                  v-show="areTeamsSelected && !leagueData.win_loss_only"
                  class="hidden-md-and-up"
                >
                  <v-flex xs12 class="pa-1 text-xs-center">
                    <div class="subheading">Score</div>
                  </v-flex>
                  <v-flex xs12 md5 class="pa-1 text-xs-center">
                    <v-text-field
                      type="number"
                      :label="`${homeTeamName} score`"
                      v-model="homeScore"
                      min="0"
                      step="1"
                      :rules="scoreRules"
                      outline
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md2 class="pa-1"> </v-flex>
                  <v-flex xs12 md5 class="pa-1 text-xs-center">
                    <v-text-field
                      type="number"
                      :label="`${awayTeamName} score`"
                      v-model="awayScore"
                      min="0"
                      step="1"
                      :rules="scoreRules"
                      outline
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout
                  wrap
                  align-center
                  v-show="areTeamsSelected && leagueData.win_loss_only"
                >
                  <v-flex xs12 class="pa-1 text-xs-center">
                    <div class="subheading">Who won?</div>
                  </v-flex>
                  <v-flex xs12 md5 class="pa-1 text-xs-center">
                    <v-btn
                      id="homeBtn"
                      class="text-none"
                      @click="selectWinner('home')"
                      large
                    >
                      {{ homeTeamName }}
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 md2 class="pa-1"> </v-flex>
                  <v-flex xs12 md5 class="pa-1 text-xs-center">
                    <v-btn
                      id="awayBtn"
                      class="text-none"
                      @click="selectWinner('away')"
                      large
                    >
                      {{ awayTeamName }}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn color="warning" @click="closeModal">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                :disabled="!readyToSubmit"
                @click="saveScore"
                >Enter Score</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </transition>
</template>

<script>
import axios from "axios";
import JQuery from "jquery";
let $ = JQuery;

export default {
  name: "NewScoreModal",
  data() {
    return {
      homeTeam: "",
      awayTeam: "",
      homeScore: null,
      awayScore: null,
      scoreRules: [
        v => String(Number(v)) === v || "Score must be a whole number"
      ],
      selectedWinner: ""
    };
  },
  props: {
    leagueTeams: {
      type: Array
    },
    leagueData: {
      type: Object
    },
    loadingData: {
      type: Boolean
    },
    loadingTeams: {
      type: Boolean
    }
  },
  computed: {
    homeTeams() {
      return this.leagueTeams.filter(team => team._id !== this.awayTeam);
    },
    awayTeams() {
      return this.leagueTeams.filter(team => team._id !== this.homeTeam);
    },
    homePlayers() {
      return this.leagueData.members.filter(
        member => member._id !== this.awayTeam
      );
    },
    awayPlayers() {
      return this.leagueData.members.filter(
        member => member._id !== this.homeTeam
      );
    },
    areTeamsSelected() {
      return this.homeTeam !== "" && this.awayTeam !== "";
    },
    homeTeamName() {
      if (this.leagueData.team_size === 1) {
        return this.homeTeam !== ""
          ? this.leagueData.members.filter(
              member => member._id === this.homeTeam
            )[0].username
          : "";
      } else {
        return this.homeTeam !== ""
          ? this.leagueTeams.filter(team => team._id === this.homeTeam)[0].name
          : "";
      }
    },
    awayTeamName() {
      if (this.leagueData.team_size === 1) {
        return this.awayTeam !== ""
          ? this.leagueData.members.filter(
              member => member._id === this.awayTeam
            )[0].username
          : "";
      } else {
        return this.awayTeam !== ""
          ? this.leagueTeams.filter(team => team._id === this.awayTeam)[0].name
          : "";
      }
    },
    readyToSubmit() {
      if (!this.leagueData.win_loss_only) {
        return (
          this.areTeamsSelected &&
          this.homeScore !== null &&
          this.awayScore !== null
        );
      } else {
        return this.areTeamsSelected && this.selectedWinner !== "";
      }
    }
  },
  methods: {
    saveScore() {
      const gameData = {
        win_loss_only: this.leagueData.win_loss_only,
        team_size: this.leagueData.team_size,
        home_team: this.homeTeam,
        away_team: this.awayTeam,
        league: this.leagueData._id,
        season: this.leagueData.default_season
      };
      if (this.leagueData.win_loss_only) {
        // submit win loss game
        gameData.selected_winner = this.selectedWinner;
      } else {
        // submit scored game
        gameData.home_score = this.homeScore;
        gameData.away_score = this.awayScore;
      }
      axios
        .post(`${process.env.VUE_APP_API_BASE}/api/games/create`, gameData)
        .then(res => {
          // clear modal data and dismiss modal
          if (res.data.success) {
            this.homeTeam = "";
            this.awayTeam = "";
            this.homeScore = null;
            this.awayScore = null;
            this.selectedWinner = "";
            this.$emit("close");
            this.$emit("reloadGames");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectWinner(team) {
      if (team === "home") {
        $("#homeBtn").addClass("selected-winner");
        $("#awayBtn").removeClass("selected-winner");
        this.selectedWinner = this.homeTeam;
      } else {
        $("#homeBtn").removeClass("selected-winner");
        $("#awayBtn").addClass("selected-winner");
        this.selectedWinner = this.awayTeam;
      }
    },
    closeModal() {
      this.$emit("close");
      let query = Object.assign({}, this.$route.query);
      delete query.newScore;
      this.$router.replace({ query });
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.selected-winner {
  background-color: #4caf50 !important;
  color: white;
}
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
