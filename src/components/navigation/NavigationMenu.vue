<template>
  <div class="nav_menu">
    <navigation-item v-for="item in items" :key="item._id" :item="item" />
  </div>
</template>

<script>
export default {
  components: {
    NavigationItem: () => import("./NavigationItem.vue"),
  },
  props: {
    items: {
      type: Array
    }
  }
}
</script>