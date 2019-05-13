<template>
  <v-card v-if="leagueGames.length > 0" elevation="1">
    <v-toolbar color="grey lighten-1" dense flat>
      <v-toolbar-title>Recent Games</v-toolbar-title>
    </v-toolbar>
    <v-container fluid grid-list-md>
      <v-data-iterator
        :items="leagueGames"
        :pagination.sync="pagination"
        :rows-per-page-items="rowsPerPage"
        content-tag="v-layout"
        row
        wrap
      >
        <v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3>
          <v-card elevation="1">
            <v-card-title>
              <h4>{{ formatDate(props.item.game_date) }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon v-if="homeWinner(props.item)">chevron_right</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  {{ homeTeamName(props.item) }}
                </v-list-tile-content>
                <v-list-tile-content
                  v-if="!props.item.win_loss_only"
                  class="align-end"
                >
                  {{ homeScore(props.item) }}
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon v-if="awayWinner(props.item)">chevron_right</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  {{ awayTeamName(props.item) }}
                </v-list-tile-content>
                <v-list-tile-content
                  v-if="!props.item.win_loss_only"
                  class="align-end"
                >
                  {{ awayScore(props.item) }}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "RecentLeagueGames",
  props: {
    leagueId: {
      type: String
    }
  },
  data() {
    return {
      leagueGames: [],
      rowsPerPage: [4],
      pagination: {
        rowsPerPage: 4
      }
    };
  },
  mounted() {
    this.loadGames();
  },
  methods: {
    loadGames() {
      axios
        .get(
          `${process.env.VUE_APP_API_BASE}/api/games/league/${this.leagueId}`
        )
        .then(res => {
          this.leagueGames = res.data.games;
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatDate(date) {
      const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
      let newDate = new Date(date);
      let hour = newDate.getHours();
      let ampm = "AM";
      if (hour === 0) {
        hour = 12;
      } else if (hour > 12) {
        hour = hour - 12;
        ampm = "PM";
      }
      let minute = newDate.getMinutes();
      if (minute < 10) {
        minute = "0" + minute;
      }
      let dateString = "";
      dateString +=
        days[newDate.getDay()] +
        " " +
        Number(newDate.getMonth() + 1) +
        "/" +
        newDate.getUTCDate() +
        "/" +
        newDate.getUTCFullYear() +
        " ";
      dateString += hour + ":" + minute + " " + ampm;
      return dateString;
    },
    homeTeamName(game) {
      if (game.team_size == 1) {
        return game.home_user.username;
      } else {
        return game.home_team.name;
      }
    },
    awayTeamName(game) {
      if (game.team_size == 1) {
        return game.away_user.username;
      } else {
        return game.away_team.name;
      }
    },
    homeScore(game) {
      if (game.winner === game.home_team._id) {
        return game.winner_score;
      } else {
        return game.loser_score;
      }
    },
    awayScore(game) {
      if (game.winner === game.away_team._id) {
        return game.winner_score;
      } else {
        return game.loser_score;
      }
    },
    homeWinner(game) {
      if (game.winner === game.home_team._id) {
        return true;
      } else {
        return false;
      }
    },
    awayWinner(game) {
      if (game.winner === game.away_team._id) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
