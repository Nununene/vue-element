<template lang="pug">
div
  ul
    li(v-for='index in indices')
      router-link(:to='index.href') {{ $t(index.label) }}
</template>

<style scoped>
div {
  background: #1b292e;
  min-height: 500px;
  width: 180px;
  height: 100%;
}

ul {
  margin: 0;
  padding: 0;
  border: 0px solid transparent;
  border-top-width: 1px;
}

li {
  display: block;
  border: 1px dotted transparent;
  border-radius: 10px 0 0 10px;
  margin: 0px 0px 0px 10px;
  padding-left: 10px;
  min-height: 36px;
  line-height: 30px;
}

li > a {
  color: #fff;
  display: inline-block;
  width: 100%;
  height: 100%;
}

li:hover {
  background: #60b2d4;
}

li:hover > a { color: #172a5a; text-decoration: none; };

li:first-child {
  margin-top: 10px;
}
</style>

<script>
export default {
  props: [
    'indices',
  ],
};
</script>
