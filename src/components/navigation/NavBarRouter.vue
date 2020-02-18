<template>
  <nav class="nav menu p-3" style="position: sticky;top: 88px;">
    <menu-item v-for="(r,i) in routes" :key="i" :route="r"></menu-item>
  </nav>
</template>

<script>
function findById(o, name) {
  if (o.name === name) {
    return o;
  }
  var result, p;
  for (p in o) {
    if (o.hasOwnProperty(p) && typeof o[p] === "object") {
      result = findById(o[p], name);
      if (result) {
        return result;
      }
    }
  }
  return result;
}
export default {
  name: "navbar",
  components: {
    MenuItem: () => import("./MenuItem")
  },
  props: {
    parent: {
      type: String
    },
    includeParent: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    routes() {
      if (parent) {
        let tree;
        if (this.includeParent) tree = [findById(this.$router.options.routes, this.parent)]
        else tree = findById(this.$router.options.routes, this.parent).children; 
        return tree;
      }
      return this.$router.options.routes;
    }
  },
};
</script>

<style>
</style>