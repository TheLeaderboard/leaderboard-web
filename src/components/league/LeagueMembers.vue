<template>
  <v-card elevation="1">
    <v-toolbar color="grey lighten-1" dense flat>
      <v-toolbar-title>
        Members
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        v-if="!showList"
        @click="showList = true">
        <v-icon>expand_more</v-icon>
      </v-btn>
      <v-btn
        icon
        v-if="showList"
        @click="showList = false">
        <v-icon>expand_less</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list
      v-if="members.length > 0 && showList"
      dense
      two-line>
      <template v-for="(member, index) in members">
        <v-divider
          v-if="index != 0"
          :key="`divider${index}`"></v-divider>
        <v-list-tile
          :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{ member.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ member.username }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "LeagueMembers",
  data() {
    return {
      showList: true
    };
  },
  props: {
    members: {
      type: Array
    }
  }
};
</script>

<style scoped>
</style>
