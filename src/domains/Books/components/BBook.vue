<template>
  <b-card
    class="book"
    :highlight="isInCart(details.id)"
    :announcement="parseToPercentage(details.discount)"
  >
    <template v-slot:header>
      <h3 class="book__title truncate" :title="details.title">{{details.title}}</h3>
      <small class="book__subtitle">
        ISBN: {{details.isbn13}}
      </small>
    </template>

    <template v-slot:body>
      <div class="book__details">
        <div class="thumbnail">
          <img :src="details.image" :alt="details.title" />
        </div>

        <div class="about">
          <p class="about__info">{{details.subtitle}}</p>
          <strong class="about__price">R${{parseToBRL(details.price) || '0,00'}}</strong>
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <b-button
        :block="true"
        @click="handleCartInteraction({ ...details, quantity: 1 })"
      >
        {{!isInCart(details.id) ? 'Adicionar ao' : 'Remover do'}} carrinho
      </b-button>
    </template>
  </b-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { BButton, BCard } from '@/components';
import { CurrencyMixin } from "@/mixins";

export default {
  props: ['details'],
  components: { BButton, BCard },
  mixins: [CurrencyMixin],

  computed: {
    ...mapState(["application", "cart"]),
    ...mapGetters("cart", ["count", "total"]),
  },

  methods: {
    ...mapActions({
      addItem: 'cart/addItem',
      removeItem: 'cart/removeItem',
    }),

    handleCartInteraction(item) {
      (!this.isInCart(item.id))
        ? this.addItem(item)
        : this.removeItem(item)
    },

    isInCart(id) {
      return this.cart.items.find(item => item.id === id);
    },

    parseToPercentage(value) {
      return (value) ? `-${value}%` : null;
    },
  },
}
</script>

<style lang="scss" scoped>
.book {
  height: 100%;
  .truncate {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__title {
    padding: 0 45px 0 0;
  }

  &__subtitle {
    color: #646464;
  }

  &__details {
    align-items: center;
    display: flex;
    flex-direction: column;
    .thumbnail {
      height: 250px;
      border-radius: 10px;
      margin: 15px 0 30px;
      overflow: hidden;
      width: 200px;

      img {
        transform: translate(-50px, -50px);
      }
    }

    .about {
      width: 100%;
      
      &__info {
        color: #646464;
        font-size: .875em;
        margin: 0 0 15px;
      }

      &__price {
        color: #383838;
        display: block;
      }
    }
  }
}
</style>