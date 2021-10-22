export default {
  methods: {
    parseToBRL(value) {
      return value > 0 ? Number(value).toLocaleString("pt-BR") : 0;
    },
  },
};
