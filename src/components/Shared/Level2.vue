<template lang="pug">
div
  div(class='menu_wrapper', :class='side_menu_status')
    SideMenu(:indices='indices')
  div(class='panel_wrapper', :class='side_menu_status')
    div(class='panel')
      router-view
  div(class='switch', :class='side_menu_status', @click='switchSideMenu')
    | {{ switch_content }}
</template>

<script>
import SideMenu from './SideMenu.vue';

export default {
  props: [
    'indices',
  ],
  components: {
    SideMenu,
  },
  methods: {
    switchSideMenu() {
      if (this.side_menu_status === 'show_menu') {
        this.side_menu_status = 'hide_menu';
        this.switch_content = '>>';
      } else {
        this.side_menu_status = 'show_menu';
        this.switch_content = '<<';
      }
    },
  },
  data() {
    return {
      switch_content: '<<',
      side_menu_status: 'show_menu',
    };
  },
};
</script>

<style scoped>
div.menu_wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 180px;
}

div.menu_wrapper.hide_menu {
  left: -170px;
}

div.panel_wrapper {
  position: absolute;
  left: 180px;
  top: 0;
  height: 95%;
}

div.panel_wrapper.hide_menu {
  left: 10px;
}

div.panel {
  margin-top: 15px;
  margin-left: 15px;
  /* border: 1px dotted #ccc; */
  min-width: 850px;
  height: 100%;
}

div.switch {
  position: absolute;
  left: 180px;
  width: 40px;
  height: 30px;
  background: #1b292e;
  text-align: center;
  line-height: 30px;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 0 10px 10px 0;
  opacity: 0.2;
}

div.switch:hover {
  opacity: 1.0;
}

div.switch.hide_menu {
  left: 10px;
}
</style>
