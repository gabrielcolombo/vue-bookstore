<template>
  <div class="input">
    <label :for="id" class="input__label" v-if="label">
      {{label}}
    </label>

    <input
      class="input__field"
      v-model="modelValue"
      :id="id"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput($event.target.value)"
      @keyup.enter="onEnter"
    />
  </div>
</template>

<script>
  export default {
    props: ['label', 'modelValue', 'id', 'name', 'placeholder', 'disabled'],

    computed: {
      styles() {
        const styles = ['badge'];

        if (this.interactive) styles.push('badge--interactive');

        return styles.join(' ').trim();
      }
    },

    methods: {
      onInput(value) {
        this.$emit('update:modelValue', value);
      },

      onEnter() {
        this.$emit('keyup.enter', this.content);
      }
    }
  }
</script>

<style lang= "scss" scoped>
  .input {
    width: 100%;
    
    &__label {
      display: block;
    }

    &__field {
      border: 1px solid #e9e9e9;
      border-radius: 5px;
      padding: 8px 15px;
      font-size: .75em;
      transition: all .15s ease-out;
      width: 100%;

      &:hover {
        border: 1px solid #d3d3d3;
      }

      &:focus,
      &:active {
        outline: none;
        border-color: #cd5237;
      }
    }
  }
</style>