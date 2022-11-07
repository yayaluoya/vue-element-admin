<template>
  <div class="query__">
    <div
      class="content"
      :class="{
        s: queryConState == 'c',
        m: queryConState == 'o',
      }"
    >
      <div class="queryContent" ref="queryConEl">
        <div class="query" ref="queryEl">
          <slot :setSpanWidth="setSpanWidth" />
        </div>
      </div>
      <div class="con">
        <span
          class="con_"
          v-if="showQueryCon"
          @click="
            () => {
              queryConState = {
                c: 'o',
                o: 'c',
              }[queryConState];
            }
          "
        >
          {{ queryConState == "c" ? "展开" : "收起" }}
          <i
            :class="
              queryConState == 'c' ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
            "
          ></i>
        </span>
        <slot
          name="con"
          v-bind="{
            search,
            resetSearch,
          }"
        >
          <el-button type="primary" @click="search()">筛选</el-button>
          <span class="span_button" @click="resetSearch()">重置筛选条件</span>
        </slot>
      </div>
    </div>
    <div class="bottom" v-if="ifBottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script>
import { RequestAnimationFrameE } from "yayaluoya-tool/dist/web/event/RequestAnimationFrameE";
export default {
  components: {},
  props: {
    spanW: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showQueryCon: false,
      /** o: 展开，c：关闭 */
      queryConState: "c",
    };
  },
  computed: {
    ifBottom() {
      return !!this.$slots.bottom;
    },
  },
  mounted() {
    this.setSpanWidth();
    RequestAnimationFrameE.instance.on("exec", this, this.getQueryState);
  },
  destroyed() {
    RequestAnimationFrameE.instance.off("exec", this);
  },
  methods: {
    /** 计算筛选项中最大的span宽度 */
    setSpanWidth() {
      let queryEl = this.$refs.queryEl;
      queryEl.querySelectorAll(".i>span:nth-child(1)").forEach((_) => {
        _.style.width = "max-content";
      });
      let spanWidth = this.spanW
        ? this.spanW
        : Math.ceil(
            Math.max(
              ...[...queryEl.querySelectorAll(".i>span:nth-child(1)")].map(
                (_) => {
                  return _.getBoundingClientRect().width;
                }
              )
            )
          );
      this.$el.style.setProperty("--span-width", spanWidth + "px");
      queryEl.querySelectorAll(".i>span:nth-child(1)").forEach((_) => {
        _.style.width = "var(--span-width)";
      });
    },
    /** 获取query的状态 */
    getQueryState() {
      let queryConEl = this.$refs.queryConEl;
      let queryEl = this.$refs.queryEl;
      let queryConState = this.queryConState;
      let queryH = queryEl.getBoundingClientRect().height;
      let queryIAverageH = Math.max(
        ...[...queryEl.children]
          //取element元素
          .filter((_) => _ instanceof HTMLElement)
          //取第一行
          .filter((_) => {
            return (
              _.getBoundingClientRect().top -
                _.parentElement.getBoundingClientRect().top ==
              0
            );
          })
          .map((_) => {
            return _.getBoundingClientRect().height;
          })
      );
      // 存在多列或者已经展开就需要显示这个操作按钮
      this.showQueryCon = queryIAverageH < queryH || queryConState == "o";
      /** 设置queryConEl的高度 */
      let onHeight = 0;
      if (queryConState == "o") {
        onHeight = queryH;
      }
      if (queryConState == "c") {
        onHeight = queryIAverageH;
      }
      queryConEl.style.height = onHeight + "px";
    },
    search() {
      console.log("搜索");
      this.$emit("search");
    },
    resetSearch() {
      console.log("重置搜索条件");
      this.$emit("resetSearch");
    },
  },
};
</script>

<style scoped lang="scss">
.query__ {
  padding: 20px;
  background: #f6f7f9;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  --span-width: 0px;
  > .content {
    display: flex;
    > .queryContent {
      overflow: hidden;
      transition: height 0.4s;
      > .query {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 20px;
        > .item,
        > .i {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: nowrap;
          > span {
            width: var(--span-width);
            margin-right: 10px;
            color: rgba(0, 0, 0, 0.8);
            white-space: nowrap;
            text-align: right;
          }
          > :nth-child(2) {
            flex: 1 1 0%;
            width: 0;
          }
        }
      }
    }
    > .con {
      display: flex;
      flex-direction: row;
      align-items: center;
      > * {
        margin: 0;
        margin-right: 15px;
      }
      > .span_button,
      > .sb {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #0046fd;
        transition: all 0.4s;
        cursor: pointer;
        &:hover {
          font-weight: bold;
        }
      }
      > .con_ {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #4c4c4c;
        transition: all 0.4s;
        cursor: pointer;
        &:hover {
          color: #0046fd;
          font-weight: bold;
        }
      }
      & > *:nth-last-child(1) {
        margin-right: 0;
      }
    }
    // 单行显示
    &.s {
      display: flex;
      flex-direction: row;
      > .queryContent {
        width: 0;
        flex: 1 1 0;
      }
      > .con {
        margin-left: 20px;
      }
    }
    &.m {
      display: flex;
      flex-direction: column;
      > .queryContent {
        width: 100%;
      }
      > .con {
        margin-top: 20px;
        padding-left: calc(var(--span-width) + 10px);
      }
    }
  }
  > .bottom {
    margin-top: 20px;
    padding-left: calc(var(--span-width) + 10px);
  }
}
</style>
