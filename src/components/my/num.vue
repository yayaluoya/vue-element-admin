<template>
  <span class="num">{{ num }}</span>
</template>

<script>
export default {
  components: {},
  props: ["n"],
  data() {
    return {};
  },
  computed: {
    num() {
      return this.n;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.num {
}
</style>