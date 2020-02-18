<template>
  <div class="nav_menu-item">
    <router-link class="nav-link" :to="item.fullpath">{{item.title}}</router-link>
  </div>
</template>

<script>
export default {
  name: "NavigationItem",
  props: {
    item: {
      type: Object
    }
  }
};
</script>

<style scoped>
.nav_menu-item {
  list-style: none;
  margin-bottom: 6px;
  background-color: #fff;

  border-radius: 3px;
}
.nav_menu-item .nav-link {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
  padding: 6px 12px;
}
</style>