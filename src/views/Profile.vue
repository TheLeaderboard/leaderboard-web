<template>
  <v-container>
    <WebProfile class="hidden-sm-and-down" />
    <MobileProfile class="hidden-md-and-up" />
  </v-container>
</template>

<script>
import WebProfile from "@/components/profile/WebProfile.vue";
import MobileProfile from "@/components/profile/MobileProfile.vue";

export default {
  name: "Profile",
  components: {
    WebProfile,
    MobileProfile
  }
};
</script>

<style scoped>
</style>
