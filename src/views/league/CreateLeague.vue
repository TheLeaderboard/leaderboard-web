<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 md10 lg6>
        <v-stepper v-model="el">
          <v-stepper-header>
            <v-stepper-step 
              step="1"
              :complete="el > 1"
              editable>Basic Information</v-stepper-step>
            <v-divider v-if="el < 3"></v-divider>
            <v-stepper-step
              step="2"
              :complete="el > 2"
              :editable="validInfo">
                Invite Friends
                <small>Optional</small>
              </v-stepper-step>
              <v-divider v-if="el > 1"></v-divider>
            <v-stepper-step
              step="3"
              :complete="el > 3"
              :editable="validInfo && validRules">Review</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card>
                <v-card-text>
                  <v-form
                    ref="basicInfoForm"
                    v-model="validInfo">
                    <v-text-field
                      name="leagueName"
                      label="League name"
                      v-model="leagueName"
                      :rules="leagueNameRules"
                      autofocus
                      required></v-text-field>
                    <v-autocomplete
                      v-model="gameType"
                      :items="gameTypes"
                      :rules="gameTypeRules"
                      clearable
                      hint="Pick a game"
                      persistent-hint
                      required>
                    </v-autocomplete>
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
                    ref="inviteForm">
                    <v-combobox
                      v-model="emailChips"
                      chips
                      label="Email addresses"
                      append-icon=""
                      clearable
                      solo
                      multiple>
                      <template slot="selection" slot-scope="data">
                        <v-chip
                          :selected="data.selected"
                          close
                          @input="removeChip(data.item)">
                          <span>{{ data.item }}</span>
                        </v-chip>
                      </template>  
                    </v-combobox>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat color="warning darken-2" @click="el--">Previous</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="el++">Review</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card>
                <v-card-text>
                  <v-form
                    ref="reviewForm"
                    v-model="validReview">
                    <div class="headline">Basic Information</div>
                    <v-text-field
                      name="leagueName"
                      label="League name"
                      v-model="leagueName"
                      :rules="leagueNameRules"
                      readonly></v-text-field>
                    <v-text-field
                      name="gameType"
                      label="Game"
                      :rules="gameTypeRules"
                      v-model="gameTypeName"
                      readonly></v-text-field>
                    <div
                      class="headline"
                      v-show="emailChips.length > 0">Invited Friends</div>
                    <v-combobox
                      v-model="emailChips"
                      append-icon=""
                      chips
                      label="Email addresses"
                      readonly
                      solo
                      multiple
                      v-show="emailChips.length > 0">
                    </v-combobox>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat color="warning darken-2" @click="el--">Previous</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="success"
                    :disabled="!validReview"
                    @click="createLeague">Create League</v-btn>
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
  name: "CreateLeague",
  data() {
    return {
      el: 1,
      validInfo: false,
      validRules: true,
      validReview: false,
      gameType: null,
      emailChips: [],
      leagueName: "",
      leagueNameRules: [v => (v || "").length > 0 || "League name is required"],
      gameTypeRules: [v => (v || "").length > 0 || "Game type is required"],
      gameTypes: []
    };
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API_BASE}/api/gameDefinitions`)
      .then(res => {
        if (res.data.success) {
          res.data.game_definitions.forEach(gameDef => {
            this.gameTypes.push({
              text: gameDef.name,
              value: gameDef._id
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    gameTypeName() {
      var filteredTypes = this.gameTypes.filter(game => {
        return game.value === this.gameType;
      });
      if (filteredTypes.length > 0) {
        return filteredTypes[0].text;
      } else {
        return "";
      }
    }
  },
  methods: {
    createLeague() {
      const leagueData = {
        name: this.leagueName,
        gameType: this.gameType,
        invitedEmails: this.emailChips
      };
      axios
        .post(`${process.env.VUE_APP_API_BASE}/api/leagues/create`, leagueData)
        .then(res => {
          if (res.data.success) {
            this.$router.push(`/league/${res.data.league._id}`);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeChip(item) {
      this.emailChips.splice(this.emailChips.indexOf(item), 1);
      this.emailChips = [...this.emailChips];
    }
  }
};
</script>

<style scoped>
</style>
