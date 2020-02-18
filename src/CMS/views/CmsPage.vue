<template>
  <div class="cms">
    <v-container>
      <h1>Система управления контентом КТИ</h1>
      <router-view></router-view>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "InnerPage",
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
