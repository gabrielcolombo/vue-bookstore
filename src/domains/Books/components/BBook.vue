<template>
  <b-card class="book" announcement="-50%">
    <template v-slot:header>
      <h3 class="book__title">{{details.title}}</h3>
      <small>
        by {{details.author}}. Published by {{details.publisher}}.
      </small>
    </template>

    <template v-slot:body>
      <div class="book__details">
        <div class="thumbnail">
          <img :src="details.thumbnail" :alt="details.title" />
        </div>

        <div class="about">
          <p class="about__info">{{details.description}}</p>
          <strong class="astrongout__price">{{details.price}}</strong>
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <b-button
        :block="true"
        :disabled="isInCart(details.id)"
        @click="addItem(details)"
      >
        {{!isInCart(details.id) ? 'Adicionar' : 'Adicionado'}} ao carrinho
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
    }),

    isInCart(id) {
      return this.cart.items.find(item => item.id === id);
    }
  }
}
</script>

<style lang="scss" scoped>
.book {
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