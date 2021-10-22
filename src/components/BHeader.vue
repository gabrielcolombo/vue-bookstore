<template>
  <header class="header">
    <b-container>
      Cart ({{count}})
    </b-container>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { BLink, BContainer } from "@/components";

export default {
  components: {
    BLink,
    BContainer
  },

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