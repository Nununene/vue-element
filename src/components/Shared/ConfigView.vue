<template lang="pug">
div
  div(class='config-view')
    el-row
      el-col(:span='24')
        el-tabs(type='card')
          el-tab-pane(:label='hintedLabels[index]' v-for='(label, index) in labels')
            slot(:name='"tab-" + index')
    el-row
      el-col(:span='24')
        div(class='action_buttons')
          el-button(@click.native="$emit('confirm')")
            | {{ $t('shared.confirm') }}
          | &nbsp;&nbsp;&nbsp;
          el-button(@click.native="onCancel")
            | {{ $t('shared.cancel') }}
</template>

<script>
export default {
  props: ['labels', 'differences'],
  data() {
    // Display unsaved count at tab label.
    const hintedLabels = [];
    for (let i = 0; i < this.labels.length; i++) {
      let label;
      if (this.differences[i] === 0) {
        label = this.labels[i];
      } else {
        let count = 'N';
        if (this.differences[i] < 10) {
          count = this.differences[i];
        }
        label = '{LABEL} ({DIFF})'
          .replace('{LABEL}', this.labels[i])
          .replace('{DIFF}', count);
      }
      hintedLabels.push(label);
    }

    return {
      hintedLabels: hintedLabels,
    };
  },
  methods: {
    onCancel() {
      // Check if exists unsaved items.
      let diffCount = 0;
      for (let i = 0; i < this.labels.length; i++) {
        diffCount += this.differences[i];
      }

      let really = true;
      if (diffCount > 0) {
        const msg = this.$t('shared.foundUnsavedItems', { n: diffCount });
        really = window.confirm(msg);
      }

      if (really) {
        this.$emit('cancel');
      }
    },
  },
};
</script>

<style scoped>
.config-group {
  border: 1px solid #d3dce6;
  border-top-width: 0px;
  border-bottom-width: 0px;
}

.action_buttons {
  border: 1px solid #d3dce6;
  border-radius: 0 0 6px 6px;
  border-bottom-width: 0px;
}

.action_buttons {
  background: #48c;
  text-align: right;
  height: 45px;
}

.action_buttons > button { margin-top: 5px; }
.action_buttons > button:last-child { margin-right: 5px; }
</style>