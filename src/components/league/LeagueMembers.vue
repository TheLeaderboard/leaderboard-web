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
      v-if="(members.length > 0 || loading) && showList"
      dense
      two-line>
      <v-list-tile v-if="loading">
        <v-list-tile-content>
          <v-list-tile-title>
            <SkeletonBox :minWidth=15 :maxWidth=50 />
          </v-list-tile-title>
          <v-list-tile-sub-title>
            <SkeletonBox :minWidth=10 :maxWidth=45 />
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-if="loading"></v-divider>
      <v-list-tile v-if="loading">
        <v-list-tile-content>
          <v-list-tile-title>
            <SkeletonBox :minWidth=15 :maxWidth=50 />
          </v-list-tile-title>
          <v-list-tile-sub-title>
            <SkeletonBox :minWidth=10 :maxWidth=45 />
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
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
import SkeletonBox from "@/components/layout/SkeletonBox.vue";

export default {
  name: "LeagueMembers",
  components: {
    SkeletonBox
  },
  data() {
    return {
      showList: true
    };
  },
  props: {
    members: {
      type: Array
    },
    loading: {
      type: Boolean
    }
  }
};
</script>

<style scoped>
</style>
