<template>
  <v-app>
    <Navbar />
    <v-container>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "@/components/layout/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar: Navbar
  }
};
</script>


<style scoped>
</style>
