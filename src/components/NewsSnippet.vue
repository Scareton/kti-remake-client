<template>
  <div class="news-snippet">
    <div class="headline">Новости института</div>
    <div class="news-items">
      <div class="news-item" v-for="item in news" :key="item._id">
        <div class="news-item-wrapper">
          <v-img :src="item.image" v-if="item.image"></v-img>
          <div class="news-item-body">
            <div class="caption font-weight-bold">{{item.tag}}</div>
            <div class="font-weight-bold body-2" style="margin: 6px auto;">{{item.title}}</div>
            <div class="body-2">{{item.description}}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- TODO загрузка статей по скроллу -->
      <v-btn @click="increaseOffset">Загрузить ещё</v-btn>
    </div>
  </div>
</template>

<script>
// TODO (возможно) Кеширование статей во vuex для быстрой загрузки в других разделах 
// TODO (возможно) Унифицировать данный компонент для вывода разных типов статей. Путь выбирать пропом
import PostsService from "@/services/PostsService";
export default {
  name: "NewsSnippet",
  data: () => ({
    news: [],
    offset: 0,
    limit: 3,
    path: "/news/"
  }),
  methods: {
    getPosts() {
      PostsService.getPostsOffset(this.path, this.offset, this.limit).then(response => {
        this.news = this.news.concat(response.data.posts)
      })
    },
    increaseOffset() {
      this.offset += this.limit;
      this.getPosts();
    }
  },
  created() {
    this.getPosts();
  }
};
</script>

<style scoped>
.news-snippet {
  margin: 0 -12px;
}
.news-snippet .news-items {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -6px;
}
.news-snippet .news-items .news-item {
  flex: 1 1 33%;
  max-width: 33%;
  margin: 6px 0;
  padding: 0 6px;
}
.news-snippet .news-items .news-item .news-item-wrapper {
  transition: all 0.2s ease-in-out;
  border: 1px solid #e4e4e4;
}
.news-snippet .news-items .news-item .news-item-body {
  padding: 9px;
}

.news-snippet .news-items .news-item .news-item-wrapper:hover {
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
}
</style>