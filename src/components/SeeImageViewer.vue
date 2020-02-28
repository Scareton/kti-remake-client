<template>
  <div class="see-image-viewer">
    <v-row class="siv-items" v-if="images">
      <v-col v-for="(item, index) in images" :key="index" :cols="cols">
        <v-img class="siv-items-image" :src="`${SERVER}${item.path}`" aspect-ratio="1.7" @click="imagePreview(item, index)"></v-img>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="unset">
      <div class="siv-dialog" v-if="images[selectedImage]">
        <div class="siv-dialog-image">
          <img :src="`${SERVER}${images[selectedImage].path}`" />
        </div>
        <div class="siv-info">
          <p v-if="images[selectedImage].title">Название: {{images[selectedImage].title}}</p>
          <p v-if="images[selectedImage].place">Место: {{images[selectedImage].place}}</p>
          <p v-if="images[selectedImage].author">Автор: {{images[selectedImage].author}}</p>
        </div>
        <div class="siv-dialog-controls">
          <v-btn class="siv-dialog-control" @click="viewerControlLeft" icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn class="siv-dialog-control" @click="viewerControlRight" text icon>
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
  }),
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
.siv-items-image {
  cursor: pointer;
}
.siv-dialog {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.siv-dialog .siv-dialog-image {
  background-color: #fff;
}
.siv-dialog .siv-dialog-image img {
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
.siv-dialog .siv-dialog-controls {
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
.siv-dialog .siv-dialog-controls .siv-dialog-control {
  margin: 0 6px;
}
</style>