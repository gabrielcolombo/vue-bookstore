<template>
  <div class="search">
    <row :gutter="12">
      <column :md="12">
        <div class="search__form">
          <b-input
            v-model="modelValue"
            placeholder="Pesquise por título, autor, ISBN ou palavras-chave"
            @input="onInput($event.target.value)"
            @keyup.enter="search(modelValue)"
            :disabled="loading"
          />

          <b-button @click="search(modelValue)" :disabled="!modelValue || loading">
            Pesquisar
          </b-button>
        </div>
      </column>
    </row>

    <row :gutter="12" v-if="showLatestQueries" class="search__tags">
      <column :md="12">
        <small>Suas pesquisas recentes:</small>

        <b-badge
          :interactive="true"
          :text="term"
          @click="search(term)"
          @keyup.enter="search(term)"
          v-for="term in lastSearchQueries"
        />
      </column>
    </row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Row, Column } from "vue-grid-responsive";
import { BBadge, BButton, BContainer, BInput } from '@/components';
import BookRepository from "@domains/Books/repositories/BookRepository";

export default {
  props: ['modelValue', 'showLatestQueries', 'loading'],

  components: {
    Row,
    Column,
    BBadge,
    BContainer,
    BButton,
    BInput,
  },

  computed: {
    ...mapGetters("bookshelf", ["lastSearchQueries"]),
  },

  methods: {
    onInput(value) {
      this.$emit('update:modelValue', value);
    },

    search(query) {
      if (query) {
        this.$emit('interaction:started');

        BookRepository
          .paginate({ query, page: 1 })
          .then(data => this.$emit('api:response', data))
          .catch(err => this.$emit('api:error', err))
          .finally(() => this.$emit('interaction:completed'))
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .search {
    &__form {
      align-items: center;
      justify-content: space-between;
      display: flex;
      flex-direction: column;
      width: 100%;
      
      .btn {
        margin: 10px 0 0;
        width: 100%;
      }

    }

    &__tags {
      display: none;
    }

    @media all and (min-width: 768px) {
      &__form {
        flex-direction: row;

        .btn {
          margin: 0 0 0 5px;
          width: auto;
        }
      }

      &__tags {
        display: block;
        margin: 10px 0 0;
      }
    }
  }
</style>