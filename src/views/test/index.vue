<template>
  <div class="mini_user">
    测试页面
    <el-button @click="postData">发送请求</el-button>
  </div>
</template>

<script>
import { TestAC } from "@/api/TestAC";
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    postData() {
      TestAC.instance
        .test({
          a: "fasdfads",
        })
        .then((res) => {
          console.log("请求成功", res);
        })
        .catch((e) => {
          console.log("请求失败", e);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.mini_user {
}
</style>