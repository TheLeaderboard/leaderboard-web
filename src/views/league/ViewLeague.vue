<template>
  <div>
    {{ leagueData }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewLeague",
  data() {
    return {
      leagueData: null
    };
  },
  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_API_BASE}/api/leagues/${this.$route.params.id}`
      )
      .then(res => {
        if (res.data.success) {
          this.leagueData = res.data.league;
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
