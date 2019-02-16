<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-if="myInvitations.length > 0" xs12 md6 lg4 class="mx-2">
        <MyInvitations />
      </v-flex>
      <v-flex xs12 md6 lg4 class="mx-2">
        <MyLeagues />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MyLeagues from "@/components/home/MyLeagues.vue";
import MyInvitations from "@/components/home/MyInvitations.vue";

export default {
  name: "Home",
  components: {
    MyLeagues: MyLeagues,
    MyInvitations: MyInvitations
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    myInvitations() {
      return this.$store.state.myInvitations;
    }
  },
  mounted() {
    // check for user invitations
    this.$store.dispatch("loadMyInvitations");
  }
};
</script>

<style scoped>
</style>
