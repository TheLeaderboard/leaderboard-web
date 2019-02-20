<template>
  <v-container fluid fill-height class="hero">
    <v-layout justify-center align-center column pa-5>
      <div class="display-3 font-weight-black text-xs-center white--text">
        {{ appTitle }}
      </div>
      <!-- <div class="display-1 font-weight-bold text-xs-center">
        Tagline goes here
      </div> -->
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "LandingHero",
  data() {
    return {
      appTitle: process.env.VUE_APP_TITLE
    };
  }
};
</script>

<style scoped>
.hero {
  background: url("https://source.unsplash.com/kOfVxiO1LOk") center;
  background-size: cover;
  width: 100%;
  height: 100%;
  max-height: 100vh;
}
</style>
