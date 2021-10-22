<template>
  <main>
    <b-container>
      <row container :gutter="12">
        <column>
          <table class="table">
            <thead class="table__head">
              <tr class="table__row">
                <th class="table__heading" >Título</th>
                <th class="table__heading" align="center">ISBN</th>
                <th class="table__heading" align="right">Preço (R$)</th>
                <th class="table__heading" align="right">Quantidade</th>
                <th class="table__heading" align="right">Total (R$)</th>
                <th class="table__heading"></th>
              </tr>
            </thead>
            <tbody class="table__body">
              <tr class="table__row" v-if="cart.items.length === 0">
                <td class="table__cell" colspan="6" align="center">
                  <div>Você não possui livros no carrinho</div>
                  <div>
                    <!-- TODO: Add call to action to catalog -->
                  </div>
                </td>
              </tr>
              <tr class="table__row" v-for="book in cart.items" v-else>
                <td class="table__cell">{{book.title}}</td>
                <td class="table__cell" align="center">{{book.isbn13}}</td>
                <td class="table__cell" align="right">{{parseToBRL(book.price) || '0,00'}}</td>
                <td class="table__cell" align="right">
                  <div class="custom-cell">
                    <b-button
                      :disabled="book.quantity === 1"
                      @click="updateItem({ ...book, quantity: book.quantity - 1 })"
                    >
                      <i class="gg-math-minus"></i>
                    </b-button>

                    {{book.quantity}}

                    <b-button
                      @click="updateItem({ ...book, quantity: book.quantity + 1 })"
                    >
                      <i class="gg-math-plus"></i>
                    </b-button>
                  </div>
                </td>
                <td class="table__cell" align="right">{{parseToBRL(book.price * book.quantity) || '0,00'}}</td>
                <td class="table__cell" align="center">
                  <div class="custom-cell">
                    <b-button @click="removeItem(book)">
                      Remover
                    </b-button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </column>
      </row>

      <row container :gutter="12" v-if="cart.items.length > 0">
        <column :md="4" :mdOffset="8">
          <b-callout :interactive="true">
            <strong>Total: R${{parseToBRL(total)}}</strong>
            <small>Clique aqui para finalizar sua compra</small>
          </b-callout>
        </column>
      </row>
    </b-container>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Row, Column } from "vue-grid-responsive";
import { BButton, BCallout, BLink, BContainer, BCard } from '@/components';
import { CurrencyMixin } from "@/mixins";

export default {
  components: {
    Row,
    Column,
    BContainer,
    BButton,
    BLink,
    BCard,
    BCallout,
  },

  mixins: [CurrencyMixin],

  data() {
    return {
      query: '',
      loading: false,
    }
  },

  computed: {
    ...mapState(["application", "cart", "bookshelf"]),
    ...mapGetters("cart", ["total"]),

    isFirstAccess() {
      return !this.lastSearchedValue && !this.bookshelf.search.hasInteractedPreviously;
    },
  },

  methods: {
   ...mapActions({
      updateItem: 'cart/updateItem',
      removeItem: 'cart/removeItem',
    }),
  }
}
</script>

<style lang="scss" scoped>
  .table {
    background: #fff;
    border: 1px solid #e9e9e9;
    width: 100%;

    &__head {
      .table__row {
        border-bottom: 1px solid #e9e9e9;
      }
    }

    &__body {
      .table__row {
          border-bottom: 1px solid #e9e9e9;
      }
    }

    &__heading,
    &__cell {
      padding: 15px;
    }
  }
  .custom-cell {
    display: flex;
    justify-content: flex-end;
    .btn {
      background: none;
      box-shadow: none;
      padding: 10px 5px;

      &:hover,
      &:focus {
        color: inherit;
      }

      &:first-child {
        margin: 0 15px 0 0;
      }

      &:last-child {
        margin: 0 0 0 15px;
      }
    }
  }
</style>