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
      type: Number
    },
    height: {
      // default is same height as text
      default: "1em",
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
      return (
        this.width ||
        `${Math.floor(
          Math.random() * (this.maxWidth - this.minWidth) + this.minWidth
        )}%`
      );
    }
  }
};
</script>

<style scoped>
.skeleton-box {
  display: inline-block;
  vertical-align: middle;
  background-color: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 1200px 104px;

  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: placeholderShimmer;
  -webkit-animation-timing-function: linear;

  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderShimmer;
  animation-timing-function: linear;
}

@-webkit-keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}

@keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}
</style>
