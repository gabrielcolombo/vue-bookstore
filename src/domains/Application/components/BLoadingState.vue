<template>
  <div class="loading-state">
    <b-spinner />
  </div>
</template>

<script>
  import { BSpinner } from '@/components';

  export default {
    components: {
      BSpinner
    }
  }
</script>

<style lang="scss" scoped>
  .loading-state {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 60px 0;
    padding: 60px;
  }
</style>