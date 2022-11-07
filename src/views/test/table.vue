<template>
  <Table
    :tableData="tableData"
    :pagination="pagination"
    @pageChange="pageChange"
    @sizeChange="sizeChange"
    v-loading="loading.get('list')"
    index="index"
    ref="table"
  >
    <el-table-column prop="test" label="测试" :resizable="false">
    </el-table-column>
    <template #con="{ row, index }">
      <span>普通</span>
      <span class="red" @click="onDelete = row">红色</span>
      <span class="green">绿色</span>
      <span class="dark_blue">深蓝色</span>
      <span class="grey">灰色</span>
      <el-button v-if="index % 2 == 0">其它类型按钮</el-button>
    </template>
  </Table>
</template>

<script>
import { TestAC } from "@/api/TestAC";
import { ArrayT } from "@/utils/ArrayT";
import Table from "@/components/Table/Table.vue";
import { comPagination } from "@/components/Table/comPagination";
import { Mes } from "@/utils/Mes";
import { ObjectUtils } from "yayaluoya-tool/dist/obj/ObjectUtils";
import { LoadingT } from "yayaluoya-tool/dist/LoadingT";
import { ApiT } from "@/api/ApiT";

const query = {};

export default {
  components: { Table },
  data() {
    return {
      query: ObjectUtils.clone2(query),
      query_: {
        select: [
          {
            label: "选择1",
            value: 1,
          },
          {
            label: "选择2",
            value: 2,
          },
          {
            label: "选择3",
            value: 3,
          },
        ],
      },
      tableData: [],
      pagination: comPagination(),
      loading: new LoadingT(),
      onDelete: null,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    search() {
      this.loadData();
    },
    resetSearch() {
      this.query = ObjectUtils.clone2(query);
      this.loadData();
    },
    pageChange(page) {
      this.pagination.currentPage = page;
      this.loadData();
    },
    sizeChange(size) {
      this.pagination.pageSize = size;
      this.loadData();
    },
    queryExport() {
      // console.log("赛选条件导出");
      this.$refs.table.exportExcel("投诉历史", this.tableData);
    },
    loadData() {
      this.loading.set(true, "list");
      TestAC.instance
        .test({
          list: ArrayT.fill(
            {
              test: "测试数据",
            },
            Math.min(
              this.pagination.pageSize,
              100 - this.pagination.pageSize * (this.pagination.currentPage - 1)
            )
          ),
          total: 100,
        })
        .then((data) => {
          this.tableData = ApiT.indexHandle(data.list, this.pagination);
          this.pagination.total = data.total;
        })
        .catch(Mes.handleApiCatch)
        .finally(() => {
          this.loading.set(false, "list");
        });
    },
    deleteItem(item) {
      return TestAC.instance
        .test()
        .then(() => {
          Mes.success("删除成功");
          ArrayT.eliminate(this.tableData, item);
        })
        .catch(Mes.handleApiCatch);
    },
  },
};
</script>

<style scoped lang="scss">
.index {
}
</style>