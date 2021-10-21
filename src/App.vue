<template>
  <router-view></router-view>
</template>

<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    window.addEventListener("online", () => this.setClientConnected(true));
    window.addEventListener("offline", () => this.setClientConnected(false));
  },

  methods: {
    ...mapActions({
      setClientConnected: 'application/setClientConnected'
    }),
  },
}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Nunito Sans', sans-serif;
  }
</style>
