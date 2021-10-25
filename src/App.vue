<template>
  <application-shell>
    <router-view></router-view>
  </application-shell>
</template>

<script>
import { mapActions } from "vuex";
import { ApplicationShell } from "@domains/Application/components";

export default {
  components: {
    ApplicationShell
  },

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
    background: #f9f9f9;
    font-family: 'Nunito Sans', sans-serif;
    padding: 60px 30px 30px;
  }
</style>
