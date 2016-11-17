<template lang="pug">
Level2(:indices='indices')
</template>

<script>
import Level2 from '../Shared/Level2.vue';

export default {
  components: { Level2 },
  data() {
    return {
      indices: [
        { label: 'samples.hello', href: '/app/samples/hello' },
        { label: 'samples.elementTable', href: '/app/samples/table' },
      ],
    };
  },
};
</script>
