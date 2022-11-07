<template>
  <div class="complain_history">
    <Query @search="search" @resetSearch="resetSearch">
      <div class="i">
        <span>时间选择:</span>
        <el-date-picker
          v-model="query.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          clearable
        >
        </el-date-picker>
      </div>
      <div class="i">
        <span>下拉选择:</span>
        <el-select clearable v-model="query.select" placeholder="请选择">
          <el-option
            v-for="item in query_.select"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="i">
        <span>下拉选择-多选:</span>
        <el-select
          v-model="query.selects"
          multiple
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in query_.select"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="i">
        <span>下拉选择-多选:</span>
        <el-select
          :value="query.selects"
          multiple
          placeholder="请选择"
          clearable
          @change="
            (v) => {
              log(v, query.selects);
            }
          "
        >
          <el-option
            v-for="item in query_.select"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="i">
        <span>是否选择:</span>
        <el-select v-model="query.select2" clearable placeholder="请选择">
          <el-option label="是" :value="1"> </el-option>
          <el-option label="否" :value="0"> </el-option>
        </el-select>
      </div>
      <div class="i">
        <span>普通输入框:</span>
        <el-input
          v-model="query.input"
          clearable
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="i">
        <span>开关:</span>
        <el-switch
          v-model="query.switch"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </div>
      <div class="i">
        <span>计数器:</span>
        <el-input-number
          v-model="query.input_number"
          :min="1"
          :max="10"
          label="描述文字"
          clearable
        ></el-input-number>
      </div>
    </Query>
    <Table
      :tableData="tableData"
      :pagination="pagination"
      @pageChange="pageChange"
      @sizeChange="sizeChange"
      v-loading="loading.get('list')"
      index="index"
    >
      <el-table-column prop="test" label="测试数据" :resizable="false">
      </el-table-column>
      <el-table-column
        prop="cover"
        width="150px"
        label="图片测试"
        :resizable="false"
      >
        <template>
          <el-image
            fit="cover"
            src="//yayaluoya-blog.oss-cn-beijing.aliyuncs.com/2022-13-3/headportrait-1647154468476.png"
            :preview-src-list="[
              '//yayaluoya-blog.oss-cn-beijing.aliyuncs.com/2022-13-3/headportrait-1647154468476.png',
            ]"
          />
        </template>
      </el-table-column>
    </Table>
  </div>
</template>

<script>
import { Query } from "@/components/Query";
import Table from "@/components/Table/Table.vue";
import { ObjectUtils } from "yayaluoya-tool/dist/obj/ObjectUtils";
import { comPagination } from "@/components/Table/comPagination";
import { LoadingT } from "yayaluoya-tool/dist/LoadingT";
import { TestAC } from "@/api/TestAC";
import { ArrayT } from "@/utils/ArrayT";
import { Mes } from "@/utils/Mes";
import { ApiT } from "@/api/ApiT";

/** 这个是用来还原查询的 */
const query = {
  time: ["", ""],
  input: "请输入",
  switch: false,
  select: 1,
  select2: 1,
  selects: [1],
  input_number: 1,
};

export default {
  components: { Query, Table },
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
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    log: console.log,
    search() {
      this.pagination.currentPage = 1;
      this.loadData();
    },
    resetSearch() {
      this.query = ObjectUtils.clone2(query);
      this.pagination.currentPage = 1;
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
  },
};
</script>

<style scoped lang="scss">
.complain_history {
}
</style>