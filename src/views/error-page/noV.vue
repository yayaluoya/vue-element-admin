<template>
  <div class="noV">
    <h1>没有访问权限</h1>
    <el-button @click="toHome">回到首页</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toHome() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.noV {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>