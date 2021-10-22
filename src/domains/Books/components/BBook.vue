<template>
  <b-card
    class="book"
    :highlight="isInCart(details.id)"
    :announcement="parseToPercentage(details.discount)"
  >
    <template v-slot:header>
      <h3 class="book__title truncate" :title="details.title">{{details.title}}</h3>
      <small>
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
          <strong class="about__price">{{parseToBRL(details.price)}}</strong>
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

export default {
  props: ['details'],
  components: { BButton, BCard },

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

    parseToBRL(value) {
      return `R$${Number(value).toLocaleString('pt-BR')}`;
    }
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
      &__info {
        color: #646464;
        font-size: .875em;
        margin: 0 0 15px;
      }

      &__price {
        color: #383838;
      }
    }
  }
}
</style>