<template>
  <div class="footer">
    <v-container>
      <v-row class="caption">
        <v-col cols="3" class="">
          <p class="title">© 2004 — 2020</p>
          <p class="overline">403874 Волгоградская обл., г. Камышин, ул. Ленина 6а</p>
          <p>
            <span class>Информационное наполнение:</span>
            <br />
            <span class="overline">пресс–центр института</span>
          </p>
          <p>
            <span class>Информационное сопровождение:</span>
            <br />
            <span class="overline">информационный вычислительный центр</span>
          </p>
          <p>
            <router-link to>О сайте</router-link>
            <br />
            <router-link to>Карта сайта</router-link>
          </p>
          <p>
            По вопросам работы сайта обращайтесь:
            <br />
            <a href="mailto:webmaster@kti.ru" target="_blank">webmaster@kti.ru</a>
          </p>
          <p>
            Официальный почтовый адрес института:
            <br />
            <a href="mailto:kti@kti.ru">kti@kti.ru</a>
          </p>
        </v-col>
        <v-col cols="3" class="psmallmg">
          <p class="title">Образование</p>
          <p><router-link to=" ">Высшее образование</router-link></p>
          <p><router-link to=" ">Среднее профессиональное образование</router-link></p>
          <p><router-link to=" ">Второе высшее образование</router-link></p>
          <p><router-link to=" ">Профессиональная переподготовка и повышение квалификации</router-link></p>
          <p><router-link to=" ">Восстановление и перевод</router-link></p>
          <p><router-link to=" ">IT школа «Камышонок»</router-link></p>
        </v-col>
        <v-col cols="3" class="psmallmg">
          <p class="title">Об институте</p>
          <p><router-link to=" ">Структура</router-link></p>
          <p><router-link to=" ">Администрация</router-link></p>
          <p><router-link to=" ">Нормативные документы</router-link></p>
          <p><router-link to=" ">Электронные сервисы</router-link></p>
          <p><router-link to=" ">Виртуальная приемная</router-link></p>
          <p><router-link to=" ">Контактная информация</router-link></p>
          <p><router-link to=" ">История института</router-link></p>
          <p><router-link to=" ">Клуб выпускников</router-link></p>
          <p><router-link to=" ">СМИ о нас</router-link></p>
          <p><router-link to=" ">Институту 20 лет</router-link></p>
          <p><router-link to=" ">Институту 25 лет</router-link></p>
        </v-col>
        <v-col cols="3" class="psmallmg">
          <p class="title">Наука</p>
          <p><router-link to=" ">Научные труды сотрудников</router-link></p>
          <p><router-link to=" ">Основные направления</router-link></p>
          <p><router-link to=" ">Каталог научных услуг</router-link></p>
          <p><router-link to=" ">Разработки учёных института</router-link></p>
          <p><router-link to=" ">Руководство НИС</router-link></p>
          <p><router-link to=" ">Конференции</router-link></p>
          <p><router-link to=" ">Нормативная база</router-link></p>
          <p><router-link to=" ">Полезные ссылки</router-link></p>
          <p><router-link to=" ">Студенческое научно-техническое общество</router-link></p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
  background-color: #1976d2;
  color: #fff;
}
.v-application .footer a {
  color: #fff;
}
.v-application .psmallmg p {
  margin-bottom: 8px;
}
</style>