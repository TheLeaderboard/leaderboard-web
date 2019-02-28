<template>
  <v-layout row>
    <v-flex xs3 class="pa-1">
      <v-navigation-drawer permanent>
        <v-toolbar flat dense>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-title class="title">
                Profile
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-tile
            @click="element = 'basicInfo'">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Basic Information
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            @click="element = 'notifications'">
            <v-list-tile-action>
              <v-icon>notifications</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Notifications
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-flex>
    <v-flex xs9 class="pa-1">
      <BasicInformation v-if="element === 'basicInfo'" />
      <Notifications v-if="element === 'notifications'" />
    </v-flex>
  </v-layout>
</template>

<script>
import BasicInformation from "@/components/profile/BasicInformation.vue";
import Notifications from "@/components/profile/Notifications.vue";

export default {
  name: "WebProfile",
  components: {
    BasicInformation,
    Notifications
  },
  data() {
    return {
      element: "notifications"
    };
  }
};
</script>

<style scoped>
</style>
