<template>
  <div class="complain_history">
    <span>{{ formData }}</span>
    <br />
    <el-button title="测试表单" @click="show = true">显示表单</el-button>
    <Dialog :show.sync="show" width="700px" :comF="submit" title="测试对话框">
      <el-form
        label-width="100px"
        ref="formRef"
        :model="formData"
        status-icon
        :rules="rules"
        label-suffix=":"
      >
        <el-form-item label="标题" prop="title">
          <el-input clearable v-model="formData.title" placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item label="说明" prop="remaker">
          <el-input
            type="textarea"
            :rows="6"
            v-model="formData.remaker"
            placeholder="请输入"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="时间" prop="remaker">
          <el-date-picker
            v-model="formData.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            clearable
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="选择年" prop="year">
          <el-date-picker
            v-model="formData.year"
            type="year"
            placeholder="选择年"
            value-format="yyyy"
            format="yyyy"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择" prop="remaker">
          <el-select clearable v-model="formData.select" placeholder="请选择">
            <el-option
              v-for="item in formData_.select"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="级联选择" prop="remaker">
          <el-cascader
            v-model="formData.cascader"
            :options="formData_.cascader"
            :show-all-levels="false"
            filterable
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="富文本" prop="remaker">
          <TEditor :content.sync="formData.htmlContent" />
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import { ObjectUtils } from "yayaluoya-tool/dist/obj/ObjectUtils";
import { TestAC } from "@/api/TestAC";
import { Mes } from "@/utils/Mes";
import { FormT } from "@/utils/FormT";
import Dialog from "@/components/Dialog/index.vue";
import TEditor from "@/components/TEditor/index.vue";

const formData = {
  title: "",
  remaker: "",
  imgs: [],
  files: [],
  time: ["", ""],
  select: 1,
  cascader: "",
  user: "",
  htmlContent: "",
};

export default {
  components: { Dialog, TEditor },
  data() {
    return {
      show: false,
      rules: {
        title: FormT.getRules(function (rule, value) {
          if (/^.{5,}$/.test(value)) {
            return "长度不能大于5";
          }
        }),
        remaker: FormT.getRules(function (rule, value) {
          if (/哈/.test(value)) {
            return "不能包含哈这个字";
          }
        }),
      },
      formData: ObjectUtils.clone2(formData),
      formData_: {
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
        cascader: [
          {
            value: "zhinan",
            label: "指南",
            children: [
              {
                value: "shejiyuanze",
                label: "设计原则",
                children: [
                  {
                    value: "yizhi",
                    label: "一致",
                  },
                  {
                    value: "fankui",
                    label: "反馈",
                  },
                  {
                    value: "xiaolv",
                    label: "效率",
                  },
                  {
                    value: "kekong",
                    label: "可控",
                  },
                ],
              },
              {
                value: "daohang",
                label: "导航",
                children: [
                  {
                    value: "cexiangdaohang",
                    label: "侧向导航",
                  },
                  {
                    value: "dingbudaohang",
                    label: "顶部导航",
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    submit() {
      return FormT.v(this.$refs.formRef).then(() => {
        return TestAC.instance
          .test()
          .then(() => {
            Mes.success("提交成功");
            console.log(this.formData);
          })
          .catch(Mes.alertApiCatch);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.complain_history {
}
</style>