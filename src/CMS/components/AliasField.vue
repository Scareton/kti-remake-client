<template>
  <v-row>
    <v-col>
      <v-text-field :label="labelTitle" :value="title" @input="titleChanged"></v-text-field>
    </v-col>
    <v-col>
      <v-text-field :label="labelAlias" :value="alias" @input="aliasChanged" :rules="[rules.counter, rules.main]">
        <template v-slot:append>
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-icon v-on="on" @click="reloadAlias(title)">mdi-reload</v-icon>
            </template>
            Сгенерировать alias
          </v-tooltip>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { transliterate as tr, slugify } from "transliteration";
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    alias: {
      type: String,
      default: ""
    },
    labelTitle: {
      type: String,
      default: "Название"
    },
    labelAlias: {
      type: String,
      default: "Alias"
    },
    limit: {
      type: Number,
      default: 80
    }
  },
  computed: {
    rules() {
      return {
        main: value => {
          const pattern = /^(?! )(?!.* $)[a-z0-9 -]*/;
          // TODO Можно вписать слеш в паттерн
          return pattern.test(value) || "Неверный формат";
        },
        counter: value =>
          value.length <= this.limit || `Максимум ${this.limit} символов`
      };
    }
  },
  methods: {
    titleChanged(value) {
      this.$emit("update:title", value);
    },
    aliasChanged(value) {
      this.reloadAlias(value);
    },
    reloadAlias(value) {
      this.$emit("update:alias", slugify(value));
    }
  },
  watch: {
    title: {
      handler(value) {
        this.reloadAlias(value);
      },
      immediate: true
    }
  }
};
</script>