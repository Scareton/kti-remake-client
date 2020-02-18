<template>
  <div class="innerpage">
    <v-container>
      <!-- <span class="breadcrumbs"> -->
      <!-- <template v-for="(item, index) in breadcrumbs">
          <span class="breadcrumbs-item" :key="index">{{item.text}}&nbsp;</span>
      </template>-->
      <!-- </span> -->
      <v-row>
        <v-col cols="2" style="#f0f0f0">
          <nav-bar :parent="parent" :includeParent="false"></nav-bar>
        </v-col>
        <v-col cols="10">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "InnerPage",
  components: {
    NavBar: () => import("@/components/navigation/NavBar")
  },
  data: () => ({
    parent: null
  }),
  created() {},
  watch: {
    $route: {
      handler(value) {
        value.matched
          .filter(route => route.meta.parent)
          .slice(0)
          .reverse()
          .map(route => {
            this.parent = route.name;
          });
      },
      immediate: true
    }
  }
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

.innerpage .menu {
  flex-direction: column;
}
</style>