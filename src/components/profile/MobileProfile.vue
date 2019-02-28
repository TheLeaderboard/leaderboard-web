<template>
  <v-layout row>
    <v-flex xs12>
      <v-tabs
        centered
        v-model="tab"
        slider-color="accent">
        <v-tab
          href="#basicInfo">
          Basic Information
        </v-tab>
        <v-tab
          href="#notifications">
          Notifications
        </v-tab>
        <v-tab>
          Test
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          value="basicInfo">
          <BasicInformation />
        </v-tab-item>
        <v-tab-item
          value="notifications">
          <Notifications />
        </v-tab-item>
      </v-tabs-items>
    </v-flex>
  </v-layout>
</template>

<script>
import BasicInformation from "@/components/profile/BasicInformation.vue";
import Notifications from "@/components/profile/Notifications.vue";

export default {
  name: "MobileProfile",
  components: {
    BasicInformation,
    Notifications
  },
  data() {
    return {
      tab: "basicInfo"
    };
  }
};
</script>

<style scoped>
</style>
