<template>
  <v-card>
    <v-toolbar color="grey lighten-1">
      <v-toolbar-title>
        Teams
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        v-if="!showList && leagueTeams.length > 0"
        @click="showList = true">
        <v-icon>expand_more</v-icon>
      </v-btn>
      <v-btn
        icon
        v-if="showList && leagueTeams.length > 0"
        @click="showList = false">
        <v-icon>expand_less</v-icon>
      </v-btn>
      <v-btn
        icon
        color="success"
        :to="`/league/${leagueId}/team/create`">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list
      v-if="leagueTeams.length > 0 && showList"
      two-line>
      <template v-for="(team, index) in leagueTeams">
        <v-divider
          v-if="index !== 0"
          :key="`divider${index}`"></v-divider>
        <v-list-tile
          :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{ team.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "LeagueTeams",
  data() {
    return {
      showList: true
    };
  },
  props: {
    leagueId: {
      type: String
    },
    leagueTeams: {
      type: Array
    }
  }
};
</script>

<style scoped>
</style>
