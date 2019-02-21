<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <v-layout align-center justify-center>
        <v-flex xs12 md8 lg6 class="pa-2">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark>
              <v-toolbar-title>New Game</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-layout column>
                <v-layout wrap align-center>
                  <v-flex xs12 class="pa-2 text-xs-center">
                    <div class="subheading">Teams</div>
                  </v-flex>
                  <v-flex xs12 md5 class="pa-2">
                    <v-select
                      v-model="homeTeam"
                      :items="homeTeams"
                      item-text="name"
                      item-value="_id"
                      label="Home team"></v-select>
                  </v-flex>
                  <v-flex xs12 md2 class="pa-2 text-xs-center">
                    <div class="subheading text-uppercase font-weight-bold">vs</div>
                  </v-flex>
                  <v-flex xs12 md5 class="pa-2">
                    <v-select
                      v-model="awayTeam"
                      :items="awayTeams"
                      item-text="name"
                      item-value="_id"
                      label="Away team"></v-select>
                  </v-flex>
                </v-layout>
                <v-layout
                  wrap
                  align-center
                  v-show="areTeamsSelected && !leagueData.win_loss_only"
                  class="hidden-sm-and-down">
                  <v-flex xs12 class="pa-2 text-xs-center">
                    <div class="subheading">Score</div>
                  </v-flex>
                  <v-flex xs12 md5 class="pa-2 text-xs-center">
                    <v-text-field
                      type="number"
                      v-model="homeScore"
                      min="0"
                      step="1"
                      :rules="scoreRules"
                      outline></v-text-field>
                  </v-flex>
                  <v-flex xs12 md2 class="pa-2">
                  </v-flex>
                  <v-flex xs12 md5 class="pa-2 text-xs-center">
                    <v-text-field
                      type="number"
                      v-model="awayScore"
                      min="0"
                      step="1"
                      :rules="scoreRules"
                      outline></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout
                  wrap
                  align-center
                  v-show="areTeamsSelected && !leagueData.win_loss_only"
                  class="hidden-md-and-up">
                  <v-flex xs12 class="pa-2 text-xs-center">
                    <div class="subheading">Score</div>
                  </v-flex>
                  <v-flex xs12 md5 class="pa-2 text-xs-center">
                    <v-text-field
                      type="number"
                      :label="`${homeTeamName} score`"
                      v-model="homeScore"
                      min="0"
                      step="1"
                      :rules="scoreRules"
                      outline></v-text-field>
                  </v-flex>
                  <v-flex xs12 md2 class="pa-2">
                  </v-flex>
                  <v-flex xs12 md5 class="pa-2 text-xs-center">
                    <v-text-field
                      type="number"
                      :label="`${awayTeamName} score`"
                      v-model="awayScore"
                      min="0"
                      step="1"
                      :rules="scoreRules"
                      outline></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout
                  wrap
                  align-center
                  v-show="areTeamsSelected && leagueData.win_loss_only">
                  <v-flex xs12 class="pa-2 text-xs-center">
                    <div class="subheading">Who won?</div>
                  </v-flex>
                  <v-flex xs12 md5 class="pa-2 text-xs-center">
                    <v-btn>
                      {{ homeTeamName }}
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 md2 class="pa-2">
                  </v-flex>
                  <v-flex xs12 md5 class="pa-5 text-xs-center">
                    <v-btn>
                      {{ awayTeamName }}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="warning"
                @click="$emit('close')">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                :disabled="!readyToSubmit"
                @click="saveScore">Enter Score</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </transition>
</template>

<script>
export default {
  name: "NewScoreModal",
  data() {
    return {
      homeTeam: "",
      awayTeam: "",
      homeScore: null,
      awayScore: null,
      scoreRules: [],
      selectedWinner: ""
    };
  },
  props: {
    leagueTeams: {
      type: Array
    },
    leagueData: {
      type: Object
    }
  },
  computed: {
    homeTeams() {
      return this.leagueTeams.filter(team => team._id !== this.awayTeam);
    },
    awayTeams() {
      return this.leagueTeams.filter(team => team._id !== this.homeTeam);
    },
    areTeamsSelected() {
      return this.homeTeam !== "" && this.awayTeam !== "";
    },
    homeTeamName() {
      return this.homeTeam !== ""
        ? this.leagueTeams.filter(team => team._id === this.homeTeam)[0].name
        : "";
    },
    awayTeamName() {
      return this.awayTeam !== ""
        ? this.leagueTeams.filter(team => team._id === this.awayTeam)[0].name
        : "";
    },
    readyToSubmit() {
      return (
        this.areTeamsSelected &&
        this.homeScore !== null &&
        this.awayScore !== null
      );
    }
  },
  methods: {
    saveScore() {
      console.log(this.homeTeam);
      console.log(this.awayTeam);
      console.log(this.homeTeamName);
      console.log(this.awayTeamName);
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
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
