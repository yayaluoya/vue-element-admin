<template>
  <div class="search_input">
    <el-input
      :value="str"
      :placeholder="placeholder"
      prefix-icon="el-icon-search"
      clearable
      @input="
        (value) => {
          $emit('update:str', value);
        }
      "
      @change="
        (value) => {
          $emit('serach');
        }
      "
    >
    </el-input>
    <span @click="$emit('serach')">搜索</span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    str: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.search_input {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  > .el-input {
    ::v-deep input {
      background-color: rgba(247, 247, 247, 100);
      border-radius: 53px;
      &:not(:focus) {
        border-color: rgba(247, 247, 247, 100);
      }
    }
  }
  > span {
    margin-left: 10px;
    width: 38px;
    color: rgba(0, 132, 255, 100);
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
}
</style>
