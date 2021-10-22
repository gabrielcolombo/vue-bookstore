<template>
  <span :class="styles">
    {{text}}
  </span>
</template>

<script>
  export default {
    props: ['text', 'interactive'],

    computed: {
      styles() {
        const styles = ['badge'];

        if (this.interactive) styles.push('badge--interactive');

        return styles.join(' ').trim();
      }
    }
  }
</script>

<style lang= "scss" scoped>
  .badge {
    background: #e9e9e9;
    border-radius: 10px;
    font-size: .75em;
    font-weight: 700;
    padding: 5px 15px;
    margin: 0 5px;
    text-shadow: 0 3px 5px transparentize(#222, .95);

    &--interactive {
      cursor: pointer;
      transition: all .15s ease-out;

      &:hover {
        background: #cd5237;
        text-shadow: 0 15px 5px -10px transparentize(#222, .95);
        color: #fff;
      }
    }
  }
</style>