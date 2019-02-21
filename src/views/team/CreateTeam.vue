<template>
  <v-container>
    <v-layout row justify-center wrap>
      <v-flex xs12 class="text-xs-center pa-2">
        <div class="headline">{{ leagueData.name }} - New Team</div>
      </v-flex>
      <v-flex xs12 md10 lg6 class="pa-2">
        <v-stepper v-model="el">
          <v-stepper-header>
            <v-stepper-step
              step="1"
              :complete="el > 1"
              editable>Team Information</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              step="2"
              :complete="el > 2"
              :editable="validInfo">Review</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card>
                <v-card-text>
                  <v-form
                    ref="teamInfoForm"
                    v-model="validInfo">
                    <v-text-field
                      name="teamName"
                      label="Team name"
                      v-model="teamName"
                      :rules="teamNameRules"
                      autofocus
                      required></v-text-field>
                    <v-autocomplete
                      v-model="teamMembers"
                      :hint="teamMembersHint"
                      persistent-hint
                      clearable
                      :rules="teamMembersRules"
                      :items="teamMemberOptions"
                      item-text="username"
                      item-value="_id"
                      multiple
                      chips></v-autocomplete>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="success"
                    :disabled="!validInfo"
                    @click="el++">Next</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card>
                <v-card-text>
                  <v-form
                    ref="reviewForm"
                    v-model="validReview">
                    <div class="headline">Team Information</div>
                    <v-text-field
                      name="teamName"
                      label="Team name"
                      v-model="teamName"
                      :rules="teamNameRules"
                      readonly></v-text-field>
                    <v-autocomplete
                      v-model="reviewTeamMembersWatch"
                      hint="Team members"
                      persistent-hint
                      :rules="reviewTeamMembersRules"
                      append-icon=""
                      :items="reviewTeamMemberOptions"
                      item-text="username"
                      item-value="_id"
                      multiple
                      readonly
                      chips></v-autocomplete>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    flat
                    color="warning darken-2"
                    @click="el--">Previous</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="success"
                    :disabled="!validReview"
                    @click="createTeam">Create Team</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateTeam",
  data() {
    return {
      leagueData: {
        members: []
      },
      el: 1,
      validInfo: false,
      validReview: false,
      teamMembers: [],
      teamMemberOptions: [],
      reviewTeamMemberOptions: [],
      reviewTeamMembersWatch: [],
      teamName: "",
      teamMembersHint: "",
      teamNameRules: [v => (v || "").length > 0 || "Team name is required"],
      reviewTeamMembersRules: [
        v =>
          (v || "").length === this.leagueData.team_size ||
          `Team must have ${this.leagueData.team_size} members`
      ],
      teamMembersRules: []
    };
  },
  computed: {
    userId() {
      return this.$store.state.user.id;
    },
    username() {
      return this.$store.state.user.username;
    }
  },
  watch: {
    teamMembers: function(newVal) {
      this.reviewTeamMembersWatch = [this.userId, ...newVal];
    }
  },
  methods: {
    loadLeagueInformation(leagueId) {
      axios
        .get(`${process.env.VUE_APP_API_BASE}/api/leagues/${leagueId}`)
        .then(res => {
          this.leagueData = res.data.league;
          this.setupTeamMemberOptions(res.data.league);
        })
        .catch(err => {
          console.log(err);
        });
    },
    setupTeamMemberOptions(leagueData) {
      this.reviewTeamMemberOptions = leagueData.members;
      if (this.userId === leagueData.commissioner) {
        this.teamMemberOptions = leagueData.members;
        this.teamMembersHint = `Choose ${leagueData.team_size} team member${
          leagueData.team_size > 1 ? "s" : ""
        }`;
        this.teamMembersRules = [
          v =>
            (v || "").length === leagueData.team_size ||
            `You must select ${leagueData.team_size} team members`
        ];
      } else {
        let members = [...leagueData.members];
        let indexToRemove = null;
        for (var member in members) {
          if (members[member]._id === this.userId) {
            indexToRemove = member;
          }
        }
        members.splice(indexToRemove, 1);
        this.teamMemberOptions = members;
        this.teamMembersHint = `Choose ${leagueData.team_size - 1} team member${
          leagueData.team_size > 2 ? "s" : ""
        }`;
        this.teamMembersRules = [
          v =>
            (v || "").length === leagueData.team_size - 1 ||
            `You must select ${leagueData.team_size - 1} team member${
              leagueData.team_size > 2 ? "s" : ""
            }`
        ];
      }
    },
    createTeam() {
      console.log("Create Team");
    }
  },
  mounted() {
    this.loadLeagueInformation(this.$route.params.leagueId);
  }
};
</script>

<style scoped>
</style>
