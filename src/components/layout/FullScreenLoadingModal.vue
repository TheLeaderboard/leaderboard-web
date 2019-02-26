<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <v-progress-circular
        :size="100"
        :width="7"
        color="secondary darken-2"
        indeterminate>
      </v-progress-circular>
    </div>
  </transition>
</template>

<script>
export default {
  name: "FullScreenLoadingModal"
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
