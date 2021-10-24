<template>
  <b-card class="info-state">
    <template v-slot:body>
      <img class="info-state__image" :src="image" :alt="message" v-if="image" />

      <div class="info-state__message">
        {{message}}
      </div>

      <div class="info-state__action" v-if="action">
        <b-button @click="onClick">{{action}}</b-button>
      </div>
    </template>
  </b-card>
</template>

<script>
  import { BCard, BButton } from '@/components';

  export default {
    props: ['image', 'message', 'action'],
    components: {
      BCard,
      BButton
    },

    methods: {
      onClick(event) {
        this.$emit('click', event);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .info-state {
    color: #646464;
    padding: 60px;

    &__image,
    &__message {
      display: block;
      max-width: 480px;
    }

    &__image {
      margin: 0 auto 60px;
    }

    &__message {
      font-size: 1em;
      margin: 0 auto;
      text-align: center;
    }

    &__action {
      .btn {
        margin: 15px auto 0;
      }
    }
  }
</style>