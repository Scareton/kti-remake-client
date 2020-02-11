<template>
  <div class="news">
    <div class="news-container">
      <template v-if="news.length">
        <pre>
          {{ news }}
        </pre>
      </template>
      <template v-else>Новостей не найдено</template>
    </div>
  </div>
</template>

<script>
import PostsService from "@/services/PostsService.js";
export default {
  name: "News",
  data: () => ({
    news: []
  }),
  methods: {
    async getPosts() {
      const response = await PostsService.fetchPosts();
      if (response.data.posts) this.news = response.data.posts;
    }
  },
  mounted() {
    this.getPosts();
  }
};
</script>
