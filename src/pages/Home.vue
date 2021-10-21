<template>
  Home {{application.client.connected}}
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['application'])
}
</script>