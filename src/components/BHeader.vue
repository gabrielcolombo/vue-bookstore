<template>
  <header class="header">
    <b-container>
      <b-link to="cart">Meu carrinho ({{count}})</b-link> 
    </b-container>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { BLink, BContainer } from "@/components";

export default {
  components: { BLink, BContainer },

  computed: {
    ...mapGetters("cart", ["count"]),
  },
}
</script>

<style lang="scss" scoped>
  .header {
    align-items: center;
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }
</style>