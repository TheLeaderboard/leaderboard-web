<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 md6 lg4>
        <MyLeagues />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MyLeagues from "@/components/home/MyLeagues.vue";

export default {
  name: "Home",
  components: {
    MyLeagues: MyLeagues
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style scoped>
</style>
