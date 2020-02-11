<template>
  <div class="news-snippet">
    <div class="headline">Новости института</div>
    <div class="news-items">
      <div class="news-item" v-for="(item, index) in news" :key="index">
        <div class="news-item-wrapper">
          <v-img :src="item.image"></v-img>
          <div class="news-item-body">
            <div class="caption font-weight-bold">{{item.tag}}</div>
            <div class="font-weight-bold body-2" style="margin: 6px auto;">{{item.title}}</div>
            <div class="body-2">{{item.description}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsSnippet",
  data: () => ({
    news: [
      {
        title:
          "13 февраля состоится расширенное заседание директората института",
        description:
          "13 февраля 2020 года (четверг) в аудитории 2.11 корпуса «Б» в 14:30 состоится расширенное заседание директората института (приглашаются заведующие кафедрами)",
        publishedby: "",
        tag: "Информация",
        image: "test/slide_1.jpg"
      },
      {
        title:
          "13 февраля состоится расширенное заседание директората института",
        description:
          "13 февраля 2020 года (четверг) в аудитории 2.11 корпуса «Б» в 14:30 состоится расширенное заседание директората института (приглашаются заведующие кафедрами)",
        publishedby: "",
        tag: "Информация",
        image: "test/slide_1.jpg"
      },
      {
        title:
          "13 февраля состоится расширенное заседание директората института",
        description:
          "13 февраля 2020 года (четверг) в аудитории 2.11 корпуса «Б» в 14:30 состоится расширенное заседание директората института (приглашаются заведующие кафедрами)",
        publishedby: "",
        tag: "Информация",
        image: "test/slide_1.jpg"
      },
      {
        title:
          "13 февраля состоится расширенное заседание директората института",
        description:
          "13 февраля 2020 года (четверг) в аудитории 2.11 корпуса «Б» в 14:30 состоится расширенное заседание директората института (приглашаются заведующие кафедрами)",
        publishedby: "",
        tag: "Информация",
        image: "test/slide_1.jpg"
      }
    ]
  })
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