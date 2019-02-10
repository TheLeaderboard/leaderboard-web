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
                    color="primary"
                    :disabled="!validInfo"
                    @click="el++">Next</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card>
                <v-card-text>
                  <v-form
                    ref="rulesForm"></v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat color="primary" @click="el--">Previous</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="el++">Review</v-btn>
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
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat color="primary" @click="el--">Previous</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
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
export default {
  name: "CreateLeague",
  data() {
    return {
      el: 1,
      validInfo: false,
      validRules: true,
      validReview: false,
      gameType: null,
      leagueName: "",
      leagueNameRules: [v => (v || "").length > 0 || "League name is required"],
      gameTypeRules: [v => (v || "").length > 0 || "Game type is required"],
      gameTypes: [
        {
          text: "Basketball",
          value: "1"
        },
        {
          text: "Euchre",
          value: "2"
        }
      ]
    };
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
      console.log("Create League");
    }
  }
};
</script>

<style scoped>
</style>
