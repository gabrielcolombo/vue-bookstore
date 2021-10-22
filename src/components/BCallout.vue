<template>
  <b-card class="callout" :interactive="interactive">
    <template v-slot:body>
      <div class="callout__body">
        <slot></slot>
      </div>
    </template>
  </b-card>
</template>

<script>
  import { BCard } from '@/components';

  export default {
    components: { BCard },
    props: {
      interactive: {
        default: false,
      }
    },
  }
</script>

<style lang= "scss" scoped>
  .callout {
    height: 100%;
    margin: 0 0 15px;

    &__body {
      align-items: center;
      display: flex;
      justify-content: space-between;

      h2 {
        font-size: 1.25em;
        font-weight: 600;
      }
    }
  }
</style>