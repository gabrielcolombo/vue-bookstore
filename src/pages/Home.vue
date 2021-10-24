<template>
  <b-search-bar
    v-model="query"
    :loading="loading"
    :showLatestQueries="!isFirstAccess && !!lastSearchedValue"
    @api:response="this.onSearchResponse"
    @interaction:started="this.onSearchRequest"
    @interaction:completed="this.onSearchCompleted"
  />

  <div class="callouts">
    <row :gutter="12">
      <column :md="6">
        <b-card class="callout">
          <template v-slot:body>
            <div class="callout__body">
              <h2>
                {{count === 0 ? 'Seu carrinho está vazio' : `Seu carrinho (${count})`}}
              </h2>

              <b-link to="/cart" text="Ir para o carrinho" icon="arrow-right" v-if="count > 0" />
            </div>
          </template>
        </b-card>
      </column>
      
      <column :md="6">
        <b-card
          tabindex="0"
          class="callout"
          :interactive="true"
          @click="fetchNewestBooks"
          @keyup.enter="fetchNewestBooks"
        >
          <template v-slot:body>
            <div class="callout__body">
              <h2>Clique aqui e veja nossos lançamentos</h2>
            </div>
          </template>
        </b-card>
      </column>
    </row>
  </div>

  <row :gutter="12" v-if="isFirstAccess || loading">
    <column v-if="isFirstAccess && !loading">
      <b-info-state
        image="/images/states/initial-state.svg"
        message="Realize uma busca no campo acima ou clique no card para ver nossos lançamentos"
      />
    </column>

    <column v-if="loading">
      <b-loading-state />
    </column>
  </row>

  <row :gutter="12" v-if="!isFirstAccess && !loading && !bookshelf.search.lastResults.length">
    <column>
      <b-info-state
        image="/images/states/empty-search-state.svg"
        :message='`Não encotramos nenhum livro, autor ou palavra-chave com o termo "${lastSearchedValue}"`'
      />
    </column>
  </row>

  <row :gutter="12" v-if="!loading">
    <column :md="6" :lg="3" v-for="book in bookshelf.search.lastResults">
      <b-book :details="book" />
    </column>
  </row>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Row, Column } from "vue-grid-responsive";
import { BBadge, BButton, BLink, BContainer, BCard, BInput } from '@/components';
import { BSearchBar, BInfoState, BLoadingState } from '@domains/Application/components';
import { BBook } from '@domains/Books/components';
import { Storage } from '@/services';

import BookRepository from "@domains/Books/repositories/BookRepository";

export default {
  components: {
    Row,
    Column,
    BBadge,
    BContainer,
    BButton,
    BInput,
    BLink,
    BCard,
    BBook,
    BSearchBar,
    BInfoState,
    BLoadingState
  },

  data() {
    return {
      query: '',
      loading: false,
    }
  },

  computed: {
    ...mapState(["application", "cart", "bookshelf"]),
    ...mapGetters("bookshelf", ["lastSearchedValue", "lastSearchQueries"]),
    ...mapGetters("cart", ["count"]),

    isFirstAccess() {
      if (Storage.get('PREVIOUS_INTERACTION')) {
        return false;
      }

      return !this.lastSearchedValue && !this.bookshelf.search.hasInteractedPreviously;
    },
  },

  methods: {
    ...mapActions({
      storeSearchedValue: 'bookshelf/storeSearchedValue',
      storeLastSearchResults: 'bookshelf/storeLastSearchResults',
      setPreviousInteraction: 'bookshelf/setPreviousInteraction',
    }),

    onSearchRequest() {
      this.loading = true;
      this.setPreviousInteraction(true);
    },

    onSearchResponse({ books }) {
      this.storeLastSearchResults(books.map(this.decorateBookObj))
      this.storeSearchedValue(this.query);
    },

    onSearchCompleted() {
      this.loading = false;
      this.query = '';
    },

    fetchNewestBooks() {
      this.onSearchRequest();

      BookRepository
        .fetchNewestReleases()
        .then(({ books }) => this.storeLastSearchResults(books.map(this.decorateBookObj)))
        .catch(console.log)
        .finally(this.onSearchCompleted);
    },

    decorateBookObj(book, index) {
      const randomNumber = Math.random();
      const hasDiscount = randomNumber >= 0.65 && randomNumber <= 0.75;
      const discount = Math.floor(Math.random() * (40 - 5 + 1) + 5);

      return {
        ...book,
        id: book.isbn13,
        price: book.price.slice(1),
        discount: hasDiscount ? discount : null
      };
    }
  }
}
</script>

<style lang="scss" scoped>
  .callouts {
    margin: 15px 0;
  }

  .callout {
    height: 100%;
    margin: 0 0 15px;

    &__body {
      align-items: center;
      display: flex;
      justify-content: space-between;

      h2 {
        font-size: 1.25em;
        font-weight: 600;
      }
    }
  }
</style>