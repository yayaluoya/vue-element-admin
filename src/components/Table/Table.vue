<template>
  <div>
    <el-table
      ref="tabRef"
      class="table"
      :data="tableData"
      border
      style="width: 100%"
      header-cell-class-name="header-cell-class"
      cell-class-name="cell-class"
      :span-method="spanMethod"
      :show-header="showHeader"
      :tree-props="treeProps"
      :row-key="rowKey"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="
        (value) => {
          //当选择项发生变化时会触发该事件
          $emit('selectionChange', value);
        }
      "
      @current-change="
        (val) => {
          //当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性
          $emit('currentChange', val);
        }
      "
      @row-click="
        (val) => {
          //当某一行被点击时会触发该事件
          $emit('rowClick', val);
        }
      "
    >
      <div class="null_" slot="empty">
        <img src="@/assets/images/null.png" alt="" />
        <slot name="null"> 空空如也 </slot>
      </div>
      <slot />
      <el-table-column
        fixed="right"
        v-if="ifCon"
        :width="conWidth + 'px'"
        label="操作"
        align="right"
      >
        <template #default="scope">
          <div class="con">
            <div class="span">
              <slot name="con" :row="scope.row" :index="scope.$index" />
            </div>
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
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import { comPagination } from "./comPagination";
export default {
  components: { Pagination },
  props: {
    spanMethod: Function,
    showHeader: {
      type: Boolean,
      default: true,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Object,
      default: comPagination,
    },
    treeProps: Object,
    rowKey: String,
    highlightCurrentRow: Boolean,
  },
  data() {
    return {
      /** con项宽度 */
      conWidth: 150,
    };
  },
  computed: {
    ifCon() {
      return !!this.$scopedSlots.con;
    },
  },
  mounted() {
    this.calConWidth();
    this.timeT = setInterval(() => {
      this.calConWidth();
    }, 100);
  },
  destroyed() {
    clearInterval(this.timeT);
  },
  methods: {
    /** 计算con项的宽度 */
    calConWidth() {
      if (!this.$refs.tabRef?.$el) {
        return;
      }
      let width = Math.max(
        ...[...this.$refs.tabRef.$el.querySelectorAll(".con")].map((_) => {
          return [..._.children].reduce((a, b) => {
            return a + b.offsetWidth;
          }, 0);
        })
      );
      // console.log(width);
      this.conWidth = width + 20;
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
  .header-cell-class {
    background-color: #e8e8e8 !important;
    color: rgba(16, 16, 16, 100);
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
  .con {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    min-width: max-content;
    justify-content: flex-end;
    > .span {
      display: inline-flex;
      flex-direction: row;
      flex-wrap: wrap;
      > span {
        // font-size: 18px;
        color: rgba(90, 136, 247, 100);
        cursor: pointer;
        margin: 5px;
        &:hover {
          font-weight: bold;
        }
      }
      > span:nth-last-child(1) {
        // margin-right: 0;
      }
      > button {
        margin: 5px;
        border-radius: 4px;
        color: rgba(16, 16, 16, 100);
        font-size: 14px;
        text-align: center;
        border: 1px solid rgba(187, 187, 187, 100);
        cursor: pointer;
        background-color: white;
        height: 22px;
      }
      > button:nth-last-child(1) {
        // margin-right: 0;
      }
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
