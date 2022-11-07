<template>
  <div>
    <el-table
      ref="tabRef"
      class="table"
      :class="{
        SplitLineE: ifSplitLineE,
      }"
      :data="tableData"
      border
      style="width: 100%"
      header-cell-class-name="header-cell-class"
      cell-class-name="cell-class"
      v-bind="TVBind"
      v-on="TBOn"
    >
      <div class="null_" slot="empty">
        <img src="@/assets/images/null.png" alt="" />
        <slot name="null"> 暂无数据 </slot>
      </div>
      <el-table-column
        v-if="!!index"
        :key="index"
        :width="conWidth[autoWidth_.index.name] + 'px'"
        :label="indexTitle"
        :resizable="false"
      >
        <template #default="{ row }">
          <div
            class="auto_width"
            :class="`_${autoWidth_.index.name}`"
            @click.stop="() => {}"
          >
            <span class="f">{{ row[index] }}</span>
          </div>
        </template>
      </el-table-column>
      <slot />
      <!-- 操作的选项 -->
      <el-table-column
        fixed="right"
        v-for="(item, index) in cons"
        :key="index"
        :width="conWidth[item.name] + 'px'"
        :label="item.label"
        class-name="con____"
        :resizable="false"
      >
        <template #default="{ row, $index }">
          <div
            class="auto_width"
            :class="`_${item.name}`"
            @click.stop="() => {}"
          >
            <slot :name="item.name" :row="row" :index="$index" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom">
      <slot name="bottom">
        <span></span>
      </slot>
      <Pagination
        pos="right"
        :pagination="pagination"
        @pageChange="
          (page) => {
            $emit('pageChange', page);
          }
        "
        @sizeChange="
          (size) => {
            $emit('sizeChange', size);
          }
        "
      />
    </div>
    <!-- 导出相关 -->
    <div style="display: none" v-if="exportExcelCon.show">
      <el-table ref="tabRefExport" :data="exportExcelCon.data">
        <el-table-column
          v-if="!!index"
          :key="index"
          :label="indexTitle"
          :resizable="false"
        >
          <template #default="{ row }">
            {{ row[index] }}
          </template>
        </el-table-column>
        <slot />
      </el-table>
    </div>
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import { comPagination } from "./comPagination";
import { exportExcel } from "@/utils/exportExcel";
import { RequestAnimationFrameE } from "yayaluoya-tool/dist/web/event/RequestAnimationFrameE";
import { Mes } from "@/utils/Mes";
import { ApiT } from "@/api/ApiT";
import { computedStyleMap } from "@/utils/computedStyleMap";
export default {
  components: { Pagination },
  props: {
    index: {
      type: String,
      default: "",
    },
    indexTitle: {
      type: String,
      default: "序号",
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Object,
      default: comPagination,
    },
    conLabel: {
      type: Object,
      default: () => ({}),
    },
    autoWidth: {
      type: Array,
      default: () => [],
    },
    defWidth: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      conWidth: {},
      autoWidth_: {
        index: {
          name: "index",
        },
      },
      ifSplitLineE: false,
      exportExcelCon: {
        data: [],
        show: false,
      },
    };
  },
  computed: {
    TVBind() {
      let {
        index,
        indexTitle,
        tableData,
        pagination,
        conLabel,
        autoWidth,
        defWidth,
        ...bind
      } = {
        ...this.$props,
        ...this.$attrs,
      };
      // console.log(bind);
      return bind;
    },
    TBOn() {
      let { pageChange, sizeChange, ...on } = this.$listeners;
      return on;
    },
    /** 操作列表 */
    cons() {
      return [...Object.keys(this.$slots), ...Object.keys(this.$scopedSlots)]
        .filter((_) => /^con/.test(_))
        .map((_) => {
          return {
            name: _,
            label: this.conLabel[_] || "操作",
          };
        });
    },
    defWidth_() {
      return {
        index: 60,
        ...this.defWidth,
      };
    },
  },
  mounted() {
    RequestAnimationFrameE.instance.on("exec", this, this.calConWidth);
  },
  destroyed() {
    RequestAnimationFrameE.instance.off("exec", this);
  },
  methods: {
    clearSelection() {
      // console.log("取消选择");
      this.$refs.tabRef.clearSelection();
    },
    /**
     * 导出当前页表格
     */
    exportOnPageExcel(name) {
      return this.exportExcel(name, this.tableData);
    },
    /**
     * 根据数据导出表格
     */
    exportExcel(name, getData, query = {}, ...arg) {
      if (!getData) {
        Mes.error("exportExcel缺少参数");
        return Promise.reject();
      }
      let f = (data) => {
        if (!Array.isArray(data)) {
          console.log("导出时获取的数据不是数组");
          return Promise.reject();
        }
        this.exportExcelCon.show = true;
        this.exportExcelCon.data = data;
        return this.$nextTick()
          .then(() => {
            exportExcel(this.$refs.tabRefExport?.$el, name);
          })
          .finally(() => {
            this.exportExcelCon.show = false;
            this.exportExcelCon.data = [];
          });
      };
      if (typeof getData != "function") {
        return f(getData);
      }
      let p = comPagination(1, []);
      return getData(ApiT.getPageData(p, query), ...arg)
        .catch(Mes.alertApiCatch)
        .then((data) => {
          if (data.total <= 0) {
            return f([]);
          }
          p.pageSize = data.total;
          return getData(ApiT.getPageData(p, query), ...arg)
            .catch(Mes.alertApiCatch)
            .then((data) => {
              return f(ApiT.indexHandle(data.items, p));
            });
        });
    },
    /** 关于分割线错误的计算 */
    splitLineE() {
      if (!this.$refs.tabRef?.$el) {
        return;
      }
      let onHeadItem = this.$refs.tabRef.$el.querySelectorAll(
        ".el-table__fixed-header-wrapper .con____"
      )[0];
      let onItem = this.$refs.tabRef.$el.querySelectorAll(
        ".el-table__header-wrapper .con____"
      )[0];
      if (onHeadItem && onItem) {
        this.ifSplitLineE =
          parseInt(onHeadItem.getBoundingClientRect().left) !=
          parseInt(onItem.getBoundingClientRect().left);
      }
    },
    /** 计算con项的宽度 */
    calConWidth() {
      if (!this.$refs.tabRef?.$el) {
        return;
      }
      for (let item of [
        ...this.cons,
        ...Object.values(this.autoWidth_),
        ...Object.values(this.autoWidth),
      ]) {
        let conEls = [
          ...this.$refs.tabRef.$el.querySelectorAll(`._${item.name}`),
        ];
        let hasCon = conEls.some((_) => {
          return _.childElementCount > 0;
        });
        let width = this.defWidth_[item.name] || 0;
        if (hasCon) {
          width = Math.max(
            width,
            ...conEls.map((_) => {
              let w =
                // 所有子元素宽度+margin值
                [..._.childNodes]
                  .filter((_) => {
                    return _ instanceof Element;
                  })
                  .filter((_) => {
                    return (
                      _.getBoundingClientRect().width *
                        _.getBoundingClientRect().height >
                      0
                    );
                  })
                  .reduce((a, b) => {
                    return (
                      a +
                      b.getBoundingClientRect().width +
                      (computedStyleMap(b, "margin-left", parseInt) || 0) +
                      (computedStyleMap(b, "margin-right", parseInt) || 0)
                    );
                  }, 0);
              if (w > 0) {
                // 父节点的padding值
                w +=
                  (computedStyleMap(
                    _.parentElement,
                    "padding-left",
                    parseInt
                  ) || 0) +
                  (computedStyleMap(
                    _.parentElement,
                    "padding-right",
                    parseInt
                  ) || 0);
              }
              return w;
            })
          );
          if (width > 0) {
            width = Math.max(width, 80);
          }
        }
        //
        this.$set(this.conWidth, item.name, width);
      }
      //TODO 这里可能会有性能问题
      this.$refs.tabRef.doLayout();
    },
  },
};
</script>

<style lang="scss">
.el-tooltip__popper {
  max-width: 50%;
}
</style>
<style lang="scss">
.table {
  margin-bottom: 20px;
  line-height: 20px;
  border-radius: 4px;
  &.SplitLineE {
    .con____ {
      left: 2px;
    }
    .el-table__fixed-body-wrapper,
    .el-table__fixed-header-wrapper {
      border-right: 1px solid #dfe6ec;
    }
  }
  .header-cell-class {
    background-color: #ebeef4 !important;
    font-family: "Microsoft YaHei";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: #293f79;
  }
  .cell-class {
    color: rgba(16, 16, 16, 100);
  }
  .null_ {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
    > img {
      width: 100px;
    }
  }
  .auto_width {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    width: max-content;
    > * {
      margin-right: 10px;
    }
    > span:not(.f) {
      color: rgba(90, 136, 247, 100);
      cursor: pointer;
      font-family: "Microsoft YaHei";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;

      &:hover {
        font-weight: bold;
        text-decoration: underline;
      }

      &.d,
      &.red {
        color: #f56c6c;
      }
      &.green {
        color: #4abc78;
      }
      &.dark_blue {
        color: #28639a;
      }
      &.grey,
      &.info {
        color: #909399;
      }
      &.yellow {
        color: #faad14;
      }
    }
    > *:nth-last-child(1) {
      margin-right: 0;
    }
  }
}
.bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
