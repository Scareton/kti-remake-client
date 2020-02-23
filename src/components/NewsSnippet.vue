<template>
  <div class="news-snippet">
    <div class="headline">Новости института</div>
    <div class="news-items" v-infinite-scroll="getPosts" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="news-item" v-for="item in news" :key="item._id">
        <div class="news-item-wrapper">
          <v-img :src="item.image" v-if="item.image"></v-img>
          <div class="news-item-body">
            <div v-if="item.cover" class="news-item-cover">
              <v-img :src="SERVER + item.cover" aspect-ratio="1.7"/>
            </div>
            <div class="caption font-weight-bold">{{item.tag}}</div>
            <div class="font-weight-bold body-2" style="margin: 6px auto;">{{item.title}}</div>
            <div class="body-2">{{item.description}}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 16px;">
      <v-btn @click="increaseOffset" style="width:100%;" v-if="news.length < count">Загрузить больше новостей</v-btn>
      <div class="caption text-center" v-else>Все новости загружены</div>
    </div>
  </div>
</template>

<script>
// TODO (возможно) Кеширование статей во vuex для быстрой загрузки в других разделах
// TODO (возможно) Унифицировать данный компонент для вывода разных типов статей. Путь выбирать пропом
import PostsService from "@/services/PostsService";
export default {
  name: "NewsSnippet",
  directives: {
    infiniteScroll: () => import("vue-infinite-scroll")
  },
  data: () => ({
    news: [],
    offset: 0,
    limit: 12,
    count: null,
    path: "/news/",
    busy: false
  }),
  methods: {
    getCount() {
      PostsService.getPostsCount(this.path).then(response => {
        this.count = response.data.count;
      });
    },
    /**
     * Запросить статьи с сервера
     */
    getPosts() {
      this.busy = true;
      // Указываем путь (раздел), отступ и лимит для подгрузки статей
      PostsService.getPostsOffset(this.path, this.offset, this.limit).then(
        response => {
          // Добавляем полученные статьи к уже имеющимся
          this.news = this.news.concat(response.data.posts);
          this.endFlag = response.data.endFlag;
          this.busy = false;
        }
      );
    },
    /**
     * Запросить новые статьи, увеличив отступ
     */
    increaseOffset() {
      this.offset += this.limit;
      this.getPosts();
    }
    /**
     * Обработка события скролла для ленивой подгрузки статей
     */
    // onScroll() {
    //   if (!this.endFlag) {
    //     if (
    //       this.$el.getBoundingClientRect().bottom -
    //         document.documentElement.clientHeight <
    //       100
    //     ) {
    //       this.increaseOffset();
    //       console.log(
    //         this.$el.getBoundingClientRect().bottom -
    //           document.documentElement.clientHeight <
    //           0
    //       );
    //     }
    //   }
    // }
  },
  created() {
    // При открытии страницы запрашиваем первые посты
    this.getPosts();
    this.getCount();
  },
  mounted() {
    // window.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    // window.removeEventListener("scroll", this.onScroll);
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
.news-snippet .news-items .news-item .news-item-cover {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
</style>