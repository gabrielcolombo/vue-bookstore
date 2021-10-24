<template>
  <main>
    <b-container>
      <row>
        <column>
          <h1>Livraria Flip</h1>
        </column>
      </row>

      <row v-if="!application.client.connected">
        <column>
          <b-info-state
            message="Sua conexão caiu. Por favor, aguarde um estante e, caso necessário, clique no botão abaixo para recarregar a página"
            action="Recarregar a página"
            @click="reload"
          />
        </column>
      </row>

      <slot v-else></slot>
    </b-container>
  </main>
</template>
<script>

import { Row, Column } from "vue-grid-responsive";
import { mapState, mapActions } from "vuex";
import { BContainer } from "@/components";
import { BInfoState } from '@domains/Application/components';
import { router } from '@/router';

export default {
  components: {
    Row,
    Column,
    BContainer,
    BInfoState
  },

  computed: {
    ...mapState(["application"]),
  },

  methods: {
    ...mapActions({
      toggleClientTheme: 'application/toggleClientTheme',
    }),

    reload() {
      router.go();
    }
  }
}
</script>