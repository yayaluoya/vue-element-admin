<template>
  <el-dialog
    :title="title"
    :visible="show"
    :width="width"
    :close-on-click-modal="false"
    @close="close()"
  >
    <div class="content__" v-loading="loadingContent">
      <slot />
    </div>
    <template #footer class="dialog-footer">
      <slot name="footer" :loading="loading" :close="close" :com="com">
        <el-button :loading="loading" @click="close()">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="com()"
          >确 定</el-button
        >
      </slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "标题",
    },
    show: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "600px",
    },
    loadingContent: {
      type: Boolean,
      default: false,
    },
    //TODO 这个方法会自动绑定this
    comF: {
      type: Function,
      default: () => Promise.resolve(),
    },
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
      this.$emit("update:show", false);
    },
    com(...arg) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.comF(...arg)
        .finally(() => {
          this.loading = false;
        })
        .then(() => {
          this.close();
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>