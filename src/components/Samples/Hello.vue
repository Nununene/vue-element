<template lang="pug">
div
  | This is Hello component {{ $store.state.something }}.
  el-button(@click="moveTo()")
    | Move
</template>

<script>
import router from 'src/router.js';
export default {
  data() {
    return {
    };
  },
  methods: {
    moveTo() {
      router.push({ path: '/app/samples/table' });
    },
  },
};
</script>
