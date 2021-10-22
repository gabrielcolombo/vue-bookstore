<template>
  <button :class="styles" @click="onClick" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    props: ['onClick', 'block', 'disabled'],

    computed: {
      styles() {
        const styles = ['btn'];

        if (this.block) styles.push('btn--block');

        return styles.join(' ').trim();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn {
    align-items: center;
    background: #fff;
    border: none;
    border-radius: 5px;
    box-shadow: 0 15px 5px -10px transparentize(#222, .95);
    color: #cd5237;
    cursor: pointer;
    display: flex;
    font-size: .625em;
    font-weight: 600;
    justify-content: center;
    padding: 10px 30px;
    text-align: center;
    text-transform: uppercase;
    transition: all .15s ease-out;
    
    &:hover,
    &:focus {
      background: #cd5237;
      color: #fff;
    }

    &:disabled {
      background: #d3d3d3;
      color: #646464;
      cursor: not-allowed;
    }

    &--block {
      width: 100%;
    }
  }
</style>