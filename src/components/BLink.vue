<template>
  <router-link :to="to" :target="target" class="link">
    <span class="link__text">{{text}}</span>
    <i :class="`gg-${icon}`" v-if="icon"></i>
  </router-link>
</template>

<script>
export default {
  props: ["to", "target", "text", "icon"],
}
</script>

<style lang="scss" scoped>
  .link {
    align-items: center;
    color: #222;
    display: flex;
    text-decoration: none;
    transition: all .15s ease-out;

    &__text {
      margin: 0 5px 0 0;
    }

    &:hover,
    &:focus {
      color: #cd5237;
    }
  }
</style>