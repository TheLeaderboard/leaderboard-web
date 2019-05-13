<template>
  <v-card elevation="1">
    <v-toolbar color="grey lighten-1" flat dense>
      <v-toolbar-title>My Leagues</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/league/create" color="secondary">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list two-line dense>
      <v-list-tile v-if="myLeagues.length === 0 && !loading">
        <v-list-tile-title>No leagues yet</v-list-tile-title>
      </v-list-tile>
      <v-list-tile v-if="loading">
        <v-list-tile-title>
          <SkeletonBox :minWidth="20" :maxWidth="40" />
        </v-list-tile-title>
      </v-list-tile>
      <v-divider v-if="loading"></v-divider>
      <v-list-tile v-if="loading">
        <v-list-tile-title>
          <SkeletonBox :minWidth="20" :maxWidth="40" />
        </v-list-tile-title>
      </v-list-tile>
      <template v-for="(league, index) in myLeagues">
        <v-divider v-if="index !== 0" :key="`divider${index}`"></v-divider>
        <v-list-tile :key="index" :to="`/league/${league.id}`">
          <v-list-tile-avatar>
            <v-tooltip top>
              <v-icon slot="activator" v-if="league.commissioner">
                supervisor_account
              </v-icon>
              <span>You manage this league</span>
            </v-tooltip>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ league.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ league.teamName }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-badge v-show="false" left>
              <span slot="badge">2</span>
              <v-icon>
                chat
              </v-icon>
            </v-badge>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import SkeletonBox from "@/components/layout/SkeletonBox.vue";

export default {
  name: "MyLeagues",
  components: {
    SkeletonBox
  },
  computed: {
    myLeagues() {
      return this.$store.state.myLeagues;
    },
    loading() {
      return this.$store.state.loadingLeagues;
    }
  },
  mounted() {
    this.$store.dispatch("loadMyLeagues");
  }
};
</script>
