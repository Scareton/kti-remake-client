<template>
  <div class="homeside">
    <div class="homeside-resources">
      <v-list>
        <v-subheader class="title">Ресурсы</v-subheader>
        <v-list-item dense active-class=" " v-for="link in links" :key="link._id" :to="link.fullpath">{{link.title}}</v-list-item>
      </v-list>
    </div>

    <photo-gallery-albums-slider></photo-gallery-albums-slider>
  </div>
</template>

<script>
import PhotoGalleryAlbumsSlider from "@/components/PhotoGalleryAlbumsSlider"
import NavigationsService from "@/services/NavigationsService.js"
export default {
  name: "HomeSide",
  components: {PhotoGalleryAlbumsSlider},
  data: () => ({
    links: [],
    navigationId: "5e5cd6547cd02bb73257bbf7",
  }),
  methods: {
    getLinks() {
      NavigationsService.getLinks(this.navigationId).then(response => {
        if (response.data.success) {
          this.links = response.data.links
        }
      })
    }
  },
  created() {
    this.getLinks();
  }
};
</script>