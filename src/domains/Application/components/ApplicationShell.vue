<template>
  <slot></slot>
</template>
<script>
import { mapState, mapActions } from "vuex";
// import { BHeader } from "@/components";

export default {
  components: {
    // BHeader
  },

  computed: {
    ...mapState(["application"]),
  },

  methods: {
    ...mapActions({
      toggleClientTheme: 'application/toggleClientTheme',
    }),
  }
}
</script>