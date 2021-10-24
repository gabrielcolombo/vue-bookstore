<template>
  <div :class="styles">
    <span class="card__ribbon" v-if="announcement !== null && !interactive">{{announcement}}</span>

    <div class="card__header">
      <slot name="header"></slot>
    </div>

    <div class="card__body">
      <slot name="body"></slot>
    </div>

    <div class="card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    announcement: {
      default: null,
    },
    interactive: {
      default: false,
    },
    highlight: {
      default: false,
    },
    class: {
      default: '',
    }
  },

  computed: {
    styles() {
      const styles = [this.class, 'card'];

      if (this.interactive) styles.push('card--interactive');
      if (this.highlight) styles.push('card--highlighted');

      return styles.join(' ').trim();
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  background: #e9e9e9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  position: relative;

  &__ribbon {
    background: #cd5237;
    color: #fff;
    border-radius: 15px;
    border-bottom-right-radius: 0;
    font-size: .625em;
    font-weight: 700;
    padding: 5px 15px;
    position: absolute;
    right: -5px;
    text-shadow: 0 15px 5px -10px transparentize(#222, .95);
    top: 10px;

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      height: 10px;
      right: 0;
      width: 5px;
    }

    &::before {
      background: #903927;
      border-bottom-right-radius: 15px;
      border-top-right-radius: 15px;
      top: 24px;
      z-index: 2;
    }

    &::after {
      background: #cd5237;
      top: 20px;
      z-index: -1;
    }
  }

  &__header,
  &__body,
  &__footer {
    width: 100%;
  }

  &__body {
    margin: 15px 0;
  }

  &--interactive {
    background: #cd5237;
    color: #fff;
    transition: background .15s ease-out;

    &:hover,
    &:focus {
      background: #d2634b;
      cursor: pointer;
    }
  }

  &--highlighted {
    border-top: 5px solid #cd5237;
  }
}
</style>