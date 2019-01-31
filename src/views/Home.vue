<template>
  <div>
    Hello {{ user }}
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  }
};
</script>

<style scoped>
</style>
