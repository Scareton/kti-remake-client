<template>
  <div class="menu-item">
    <li v-if="isVisible" class="nav-item">
      <router-link exact-active-class="text-success" :to="{name: route.name}" class="nav-link">{{name}}</router-link>
    </li>

    <div v-if="route.children && route.children.length">
      <menu-item v-for="(r,i) in route.children" :key="i" :route="r" class="ml-3"></menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu-item",
  props: {
    route: {
      type: Object
    }
  },
  computed: {
    isVisible() {
      if (
        this.route.meta &&
        (this.route.meta.visible === undefined || this.route.meta.visible)
      ) {
        return true;
      }
      return false;
    },
    name() {
      return this.route.name
        .toLowerCase()
        .split("-")
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
    }
  }
};
</script>

<style scoped>
.nav-item {
  list-style: none;
  margin-bottom: 6px;
  background-color: #fff;
  
  border-radius: 3px;
}
.nav-item .nav-link {
  text-decoration: none;
  display: block;
  width:100%;
  height: 100%;
  padding: 6px 12px;
}
</style>