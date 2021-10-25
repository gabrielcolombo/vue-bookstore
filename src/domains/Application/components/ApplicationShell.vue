<template>
  <main>
    <b-container>
      <row>
        <column>
          <header class="header">
            <router-link to="/" class="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                class="logo__image"
              >
                <path fill="#cd5237" d="M 3.5 1 C 2.675781 1 2 1.675781 2 2.5 L 2 12 L 2.210938 12 C 2.429688 12.554688 2.871094 13 3.5 13 L 4 13 L 4 14 L 4.210938 14 C 4.429688 14.554688 4.871094 15 5.5 15 L 14 15 L 14 14 L 5.5 14 C 5.21875 14 5 13.78125 5 13.5 C 5 13.21875 5.21875 13 5.5 13 L 14 13 L 14 3 L 12 3 L 12 1 Z M 3.5 2 L 11 2 L 11 3 L 5.5 3 C 4.675781 3 4 3.675781 4 4.5 L 4 10 L 3.5 10 C 3.324219 10 3.15625 10.039063 3 10.09375 L 3 2.5 C 3 2.21875 3.21875 2 3.5 2 Z M 5.5 4 L 13 4 L 13 12 L 5.5 12 C 5.324219 12 5.15625 12.039063 5 12.09375 L 5 4.5 C 5 4.21875 5.21875 4 5.5 4 Z M 6 6 L 6 7 L 12 7 L 12 6 Z M 3.5 11 L 4 11 L 4 12 L 3.5 12 C 3.21875 12 3 11.78125 3 11.5 C 3 11.21875 3.21875 11 3.5 11 Z">
                </path>
              </svg>
            
              <span class="logo__text">Livraria Flip</span>
            </router-link>
          </header>
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

  <footer class="footer">
    Desenvolvido por <a href="https://github.com/gabrielcolombo">Gabriel Colombo</a>
  </footer>
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

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: center;
    margin: 0 0 30px;

    .logo {
      align-items: center;
      display: flex;
      text-decoration: none;

      &__image {
        width: 2em;
      }

      &__text {
        color: #222;
        font-size: 1.5em;
        font-weight: 700;
        margin: 0 0 0 5px;
      }
    }
  }

  .footer {
    color: #646464;
    margin: 60px 0 0;
    text-align: center;

    a {
      color: #cd5237;
      text-decoration: none;
      transition: color .15s ease-out;

      &:hover,
      &:focus {
        color: #d2634b;
      }
    }
  }
</style>