<template>
  <div class="query__">
    <div class="left">
      <slot />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.query__ {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  span {
    font-size: 16px;
  }
  > .left,
  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    > * {
      margin: 5px;
      margin-right: 29px;
      margin-left: 0;
    }
    > :nth-last-child(1) {
      margin-right: 0px;
    }
  }
  > .right {
    flex-wrap: nowrap;
  }
}
</style>
