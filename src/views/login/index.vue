<template>
  <div class="login">
    登录页面
    <el-button @click="login()">登录</el-button>
  </div>
</template>

<script>
import { TestAC } from "@/api/TestAC";
import { Mes } from "@/utils/Mes";
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    login() {
      TestAC.instance
        .test("登录")
        .then(() => {
          //登录成功
          this.$store
            .dispatch("user/login", {
              username: "",
              password: "",
            })
            .then(() => {
              this.$router.push({
                path: "/test",
              });
            });
        })
        .finally(Mes.handleApiCatch);
    },
  },
};
</script>

<style scoped lang="scss">
.login {
}
</style>