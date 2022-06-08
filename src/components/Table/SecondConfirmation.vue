<template>
  <el-dialog
    title="提示"
    :visible="!!data"
    width="400px"
    @close="close"
  >
    <slot />
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        :loading="loading"
        @click="close"
      >取 消</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="submit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    data: Object,
    comF: Function,
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {},
  methods: {
    close() {
      if (this.loading) {
        return;
      }
      this.$emit("update:data", null);
    },
    submit() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.comF(this.data).finally(() => {
        this.loading = false;
        this.close();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.removeItem {
}
</style>