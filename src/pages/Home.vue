<template>
  <header>
    <b-container>

    </b-container>
  </header>

  <main>
    <b-container>
      <row container :gutter="12">
        <column :md="4" :lg="3" v-for="num in 10">
          <b-book :details="{id: num, ...book}" />
        </column>
      </row>
    </b-container>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Row, Column } from "vue-grid-responsive";
import { BContainer, BCard } from '@/components';
import { BBook } from '@domains/Books/components';

export default {
  components: { Row, Column, BContainer, BCard, BBook },

  data() {
    return {
      book: {
        title: 'Securing DevOps',
        author: 'Julien Vehent',
        publisher: 'Manning',
        description: 'An application running in the cloud can benefit from incredible efficiencies, but they come with unique security threats too.',
        thumbnail: 'https://itbook.store/img/books/9781617294136.png',
        price: '$26.98',
      }
    }
  },

  computed: {
    ...mapState(["application", "cart", "bookshelf"]),
  },

  methods: {
    ...mapActions({
      addItem: 'cart/addItem',
      updateItem: 'cart/updateItem',
      removeItem: 'cart/removeItem',
    }),

    add() {
      this.addItem({ id: id++, price: 1.50, quantity: 2 })
    },

    update() {
      this.updateItem({ id: 2, quantity: 1 })
    },

    remove() {
      this.removeItem({ id: 3 })
    },
  }
}
</script>