<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-if="myInvitations.length > 0" xs12 class="mb-4">
        <MyInvitations 
          :invitations="myInvitations"/>
      </v-flex>
      <v-flex xs12 md6 lg4>
        <MyLeagues />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MyLeagues from "@/components/home/MyLeagues.vue";
import MyInvitations from "@/components/home/MyInvitations.vue";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      myInvitations: []
    }
  },
  components: {
    MyLeagues: MyLeagues,
    MyInvitations: MyInvitations
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    // check for user invitations
    axios
      .get(`${process.env.VUE_APP_API_BASE}/api/invitations/user`)
      .then(res => {
        if (res.data.success) {
          this.myInvitations = res.data.myInvitations;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>
