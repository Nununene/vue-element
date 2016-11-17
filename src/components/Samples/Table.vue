<template lang="pug">
div
  | This is Lang component.
  br
  | langs in conf : {{availLangs}}
  br
  br
  | Term: {{ $t('shared.hello') }}
  button(v-for="lang in availLangs", @click="switchLang(lang)")
    | {{$t(lang)}}
  br
  br
  el-button(type="primary" @click="switchValue(value1)")
    | Value1
  el-button(type="primary" @click="switchValue(value2)")
    | Value2
  el-button(type="success" @click="showMsgbox()")
    | Msgbox
  el-table(:data="tableValue" style="margin-top:5px;")
    el-table-column(inline-template, label="name")
      div {{row.name}}
    el-table-column(inline-template, label="value")
      div {{row.value}}
  br
  div
    | i18n : {{ $t('el.table.emptyText') }}
</template>

<script>
import Vue from 'vue';
import * as c from 'src/configuration';
export default {
  data() {
    return {
      availLangs: c.LANGS,
      tableValue: [],
      value1: [
        { name: 'N1', value: 'V1' },
        { name: 'N2', value: 'V2' },
      ],
      value2: [],
    };
  },
  methods: {
    // This action dispatchs to root Action
    switchLang(newLang) {
      c.DEBUG && console.log('switch lang...');
      this.$store.dispatch('switchLang', {
        newLang: newLang,
      });
    },
    switchValue(newValue) {
      this.tableValue = newValue;
    },
    showMsgbox() {
      Vue.prototype.$confirm(
        Vue.t('shared.unsavedMessage'),
        Vue.t('shared.unsavedTitle'),
        { type: 'warning' },
      );
    },
  },
};
</script>