<template>
  <router-link :to="to" :target="target" class="link">
    <span v-if="text">{{text}}</span>
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ["to", "target", "text"],
}
</script>

<style lang="scss" scoped>
  .link {
    color: #222;
    display: inline-block;
    text-decoration: none;
    transition: all .15s ease-out;

    &:hover,
    &:focus {
      color: #cd5237;
    }
  }
</style>