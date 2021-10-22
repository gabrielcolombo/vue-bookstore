<template>
  <main>
    <b-container>
      <row container :gutter="12">
        <column :md="12">
          <input v-model="query" @keyup.enter="search(query)">

          <b-button @click="search(query)" :disabled="!query">
            Pesquisar
          </b-button>
        </column>
      </row>

      <row container :gutter="12">
        <column :md="12">
          <div v-if="!isFirstAccess">
            <small>Suas últimas pesquisas:</small>

            <b-badge
              :interactive="true"
              :text="term"
              @click="search(term)"
              @keyup.enter="search(term)"
              v-for="term in bookshelf.search.history"
            />
          </div>
        </column>
      </row>

      <div class="callouts">
        <row container :gutter="12">
          <column :md="6">
            <b-card class="callout">
              <template v-slot:body>
                <div class="callout__body">
                  <h2>
                    {{count === 0 ? 'Seu carrinho está vazio' : `Seu carrinho (${count})`}}
                  </h2>

                  <b-link to="/cart" v-if="count > 0">
                    Ir para o checkout
                  </b-link>
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

      <row container :gutter="12" v-if="isFirstAccess || loading">
        <column v-if="isFirstAccess && !loading">
          <div class="centered">
            Realize uma busca no campo acima ou clique no card para ver nossos lançamentos
          </div>
        </column>

        <column v-if="loading">
          <div class="centered">
            <b-spinner />
          </div>
        </column>
      </row>

      <row container :gutter="12" v-if="!isFirstAccess && !loading && !bookshelf.search.lastResults.length">
        <column>
          <div class="centered">
            Nenhum resultado encontrado para o termo "{{lastSearchedValue}}"
          </div>
        </column>
      </row>

      <row container :gutter="12" v-if="!loading">
        <column :md="6" :lg="3" v-for="book in bookshelf.search.lastResults">
          <b-book :details="book" />
        </column>
      </row>
    </b-container>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Row, Column } from "vue-grid-responsive";
import { BBadge, BButton, BLink, BContainer, BCard, BSpinner } from '@/components';
import { BBook } from '@domains/Books/components';

import BookRepository from "@domains/Books/repositories/BookRepository";

export default {
  components: { Row, Column, BBadge, BContainer, BButton, BLink, BCard, BBook, BSpinner },

  data() {
    return {
      query: '',
      loading: false,
    }
  },

  computed: {
    ...mapState(["application", "cart", "bookshelf"]),
    ...mapGetters("bookshelf", ["lastSearchedValue"]),
    ...mapGetters("cart", ["count"]),

    isFirstAccess() {
      return !this.lastSearchedValue && !this.bookshelf.search.hasInteractedPreviously;
    },
  },

  methods: {
    ...mapActions({
      storeSearchedValue: 'bookshelf/storeSearchedValue',
      storeLastSearchResults: 'bookshelf/storeLastSearchResults',
      setPreviousInteraction: 'bookshelf/setPreviousInteraction',
    }),
    
    search(query) {
      if (query) {
        this.performAPIRequest('paginate', { query, page: 1 }, ({ books }) => {
          this.storeLastSearchResults(books.map(this.decorateBookObj))
          this.query = '';
          this.storeSearchedValue(query);
        });
      }
    },

    fetchNewestBooks() {
      this.performAPIRequest('fetchNewestReleases', {}, ({ books }) => {
        this.storeLastSearchResults(books.map(this.decorateBookObj))
      });
    },

    performAPIRequest(method, params, callback) {
      this.loading = true;
      this.setPreviousInteraction(true);
     
      BookRepository
        [method](params)
        .then(callback)
        .catch(console.log)
        .finally(() => this.loading = false);
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
    margin: 15px 0 30px;
  }

  .centered {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 120px 0 0;
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