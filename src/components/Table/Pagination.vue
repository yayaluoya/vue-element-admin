<template>
  <div :class="pos" class="pagination">
    <el-pagination
      v-if="pagination.total > 0"
      background
      :layout="layout"
      :total="pagination.total"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes || []"
      @current-change="
        (page) => {
          $emit('pageChange', page);
        }
      "
      @size-change="
        (size) => {
          $emit('sizeChange', size);
        }
      "
    >
    </el-pagination>
  </div>
</template>

<script>
import { comPagination } from "./comPagination";
export default {
  components: {},
  props: {
    pos: {
      type: String,
      default: "left",
    },
    pagination: {
      type: Object,
      default: comPagination(),
    },
  },
  data() {
    return {};
  },
  computed: {
    layout() {
      if (this.pagination.pageSizes && this.pagination.pageSizes.length > 0) {
        return "total, sizes, prev, pager, next";
      } else {
        return "total, prev, pager, next";
      }
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.pagination {
  width: 100%;
  &.left {
    > .el-pagination {
      text-align: left;
    }
  }
  &.right {
    > .el-pagination {
      text-align: right;
    }
  }
}
</style>
