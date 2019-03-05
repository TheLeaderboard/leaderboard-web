<template>
  <span
    :style="{ height, width: computedWidth }"
    class="skeleton-box"/>
</template>

<script>
export default {
  name: "SkeletonBox",
  props: {
    maxWidth: {
      // default maximum width is 100%
      default: 100,
      type: Number
    },
    minWidth: {
      default: 80,
      type: Number,
    },
    height: {
      // default is same height as text
      default: '1em',
      type: String
    },
    width: {
      // make it possible to define default width instead of random one
      default: null,
      type: String
    }
  },
  computed: {
    computedWidth() {
      // use either given fixed width or random width
      return this.width || `${Math.floor((Math.random() * (this.maxWidth - this.minWidth) + this.minWidth))}%`;
    }
  }
};
</script>

<style scoped>
.skeleton-box {
  display: inline-block;
  vertical-align: middle;
  background-color: #DDDBDD;
}
</style>
