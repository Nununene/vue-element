<template lang="pug">
div(id='whole_wrapper')
  div(id='content_wrapper', :class='content_mode')
    router-view
</template>
<script>
export default {
  data() {
    const DEV_MODE = true;
    return {
      content_mode: (DEV_MODE ? 'dev' : 'rel'),
      DEV_MODE: DEV_MODE,
    };
  },
};
</script>
