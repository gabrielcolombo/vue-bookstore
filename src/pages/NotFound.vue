<template>
  <row>
    <column>
      <b-info-state
        image="/images/states/not-found-state.svg"
        message="Página não encontrada"
        action="Voltar para a página anterior"
        @click="returnToPreviousPage"
      />
    </column>
  </row>
</template>
<script>

import { Row, Column } from "vue-grid-responsive";
import { BInfoState } from '@domains/Application/components';
import { router } from '@/router';

export default {
  components: {
    Row,
    Column,
    BInfoState
  },

  methods: {
    returnToPreviousPage() {
      router.go(-1);
    }
  }
}
</script>