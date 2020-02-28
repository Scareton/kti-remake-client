<template>
  <div class="see-image-viewer">
    <v-row class="siv-items">
      <v-col v-for="(item, index) in images" :key="index" :cols="cols">
        <v-img :src="`${SERVER}${item.path}`" aspect-ratio="1.7" @click="imagePreview(item, index)"></v-img>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="unset">
      <div class="siv-dialog">
        <div class="siv-image">
          <img :src="`${SERVER}${images[selectedImage].path}`" />
        </div>
        <div class="siv-info">
          <p v-if="images[selectedImage].title">Название: {{images[selectedImage].title}}</p>
          <p v-if="images[selectedImage].place">Место: {{images[selectedImage].place}}</p>
          <p v-if="images[selectedImage].author">Автор: {{images[selectedImage].author}}</p>
        </div>
        <div class="siv-controls">
          <v-btn class="siv-control" @click="viewerControlLeft" icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn class="siv-control" @click="viewerControlRight" text icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    images: {
      type: Array,
      default: new Array()
    },
    cols: {
      type: String,
      default: "4"
    }
  },
  data: () => ({
    dialog: false,
    selectedImage: 0,
    swiperOption: {},
    options: {}
  }),
  computed: {
    items() {
      return this.images.map(item => `${this.SERVER}${item.path}`);
    }
  },
  methods: {
    imagePreview(item, index) {
      this.dialog = true;
      this.selectedImage = index;
    },
    viewerControlLeft() {
      if (this.selectedImage !== 0) {
        this.selectedImage--;
      } else {
        this.selectedImage = this.images.length - 1;
      }
    },
    viewerControlRight() {
      if (this.selectedImage !== this.images.length - 1) {
        this.selectedImage++;
      } else {
        this.selectedImage = 0;
      }
    }
  }
};
</script>

<style scoped>
.siv-dialog {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.siv-dialog .siv-image {
  background-color: #fff;
}
.siv-dialog .siv-image img {
  max-width: 100%;
  vertical-align: bottom;
}
.siv-dialog .siv-info {
  background-color: #fff;
  font-size:14px;
}
.siv-dialog .siv-info p {
  margin: 0 12px;
}
.siv-dialog .siv-info p:first-child {
  margin-top:12px;
}
.siv-dialog .siv-info p:last-child {
  margin-bottom:12px;
}
.siv-dialog .siv-controls {
  background-color: #fff;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 56px;
  padding: 6px 12px;
  flex: 0;
  align-self: center;
  border-radius: 4px;
}
.siv-dialog .siv-controls .siv-control {
  margin: 0 6px;
}
</style>