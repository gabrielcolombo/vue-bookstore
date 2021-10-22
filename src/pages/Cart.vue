<template>
  Home {{application.client.connected}}

  <br><br>

  Cart ({{ count }}) - Total: {{ total}}

  <br>
  {{ cart.items }}

  <button @click="add">Add</button>
  <button @click="update">Update</button>
  <button @click="remove">Remove</button>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

let id = 1;

export default {
  computed: {
    ...mapState(["application", "cart"]),
    ...mapGetters("cart", ["count", "total"]),
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