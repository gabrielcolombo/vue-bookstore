<template>
  <router-link :to="to" :target="target" :class="styles">
    <span v-if="text">{{text}}</span>
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ["to", "target", "text", "variant", "round"],

  computed: {
    styles() {
      const styles = ["link", `link--${this.variant || "default"}`];

      if (this.round) styles.push("link--round");

      return styles.join(' ').trim();
    }
  }
}
</script>

<style lang="scss" scoped>
  .link {
    display: inline-block;
    text-decoration: none;
    transition: all .15s ease-out;

    &--default {
      color: #222;

      &:hover {
        color: #cd5237;
      }

      &:focus {
      }
    }

    &--round {
      border-radius: 50%;
    }
  }
</style>