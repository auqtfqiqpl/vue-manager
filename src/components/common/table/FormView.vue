<template>
  <div class="formView">
    <el-form :model="form" ref="form" :rules="rules" label-width="50px">
      <div v-for="(fieldList, lindex) in lineList" :key="lindex">
        <div v-if="fieldList.length == 1">
          <el-form-item
            v-for="(field, index) in fieldList"
            :key="index"
            :label="field.name"
            :prop="field.code"
            :label-width="field.width"
            style="width: 100%"
          >
            <el-input
              v-if="field.type == 'input'"
              v-model="form[field.code]"
              :placeholder="field.tip"
            ></el-input>
            <el-input
              v-if="field.type == 'textarea'"
              type="textarea"
              v-model="form[field.code]"
              placeholder="field.tip"
            ></el-input>
            <el-select
              v-if="field.type == 'select'"
              v-model="form[field.code]"
              placeholder="field.tip"
            ></el-select>
            <el-date-picker
              v-if="field.type == 'date'"
              type="date"
              v-model="form[field.code]"
              placeholder="field.tip"
              style="width: 100%"
            ></el-date-picker>
            <el-switch
              v-if="field.type == 'switch'"
              v-model="form[field.code]"
            ></el-switch>
            <el-checkbox-group
              v-if="field.type == 'checkbox'"
              v-model="form[field.code]"
            >
              <el-checkbox
                v-for="(a, aindex) in checkarray"
                :key="aindex"
                label="field.name"
                name="type"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>

        <div v-if="fieldList.length > 1">
          <el-row  label-width="0px">
            <el-col
              v-for="(field, index) in fieldList"
              :span="field.span"
              :key="index"
            >
              <el-form-item
                :key="index"
                :label="field.name"
                :prop="field.code"
                :label-width="field.width"
              >
                <el-input
                  v-if="field.type == 'input'"
                  v-model="form[field.code]"
                  :placeholder="field.tip"
                ></el-input>
                <el-input
                  v-if="field.type == 'textarea'"
                  type="textarea"
                  v-model="form[field.code]"
                  placeholder="field.tip"
                ></el-input>
                <el-select
                  v-if="field.type == 'select'"
                  v-model="form[field.code]"
                  placeholder="field.tip"
                ></el-select>
                <el-date-picker
                  v-if="field.type == 'date'"
                  type="date"
                  v-model="form[field.code]"
                  placeholder="field.tip"
                  style="width: 100%"
                ></el-date-picker>
                <el-switch
                  v-if="field.type == 'switch'"
                  v-model="form[field.code]"
                ></el-switch>
                <el-checkbox-group
                  v-if="field.type == 'checkbox'"
                  v-model="form[field.code]"
                >
                  <el-checkbox
                    v-for="(a, aindex) in checkarray"
                    :key="aindex"
                    label="field.name"
                    name="type"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import api from "../core/js/axiso/api";
import Status from "../core/js/status";

export default {
  name: "FormView",
  data() {
    return {
      mutilLine: "key",
      form: {},
      lineList: [
        [
          {
            code: "code1",
            name: "name1",
            width: '100px',
            type: "input",
            tip: "输入信息",
          },
        ],
        [
          {
            code: "code2",
            name: "name2",
            width: '100px',
            type: "input",
            tip: "输入信息",
            span:12
          },
          {
            code: "code3",
            name: "name阿凡达3",
            width: '100px',
            type: "input",
            tip: "输入信息",
                        span:12

          },
        ],
      ],
      rules: {
        tableName: [
          {
            required: true,
            message: "请输入生成代码的表名称",
            trigger: "blur",
          },
        ],
        prefix: [
          {
            required: true,
            message: "请剔除生成的表名前缀",
            trigger: "change",
          },
        ],
        packages: [
          { required: true, message: "请生成的类的包名", trigger: "change" },
        ],
        module: [
          { required: true, message: "请生成的类的模块名", trigger: "change" },
        ],
        fun: [
          { required: true, message: "请生成的类的功能名称", trigger: "blur" },
        ],
        author: [
          { required: true, message: "请生成的类的作者", trigger: "blur" },
        ],
        projectPath: [
          { required: false, message: "请生成的代码目录", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    let _this = this;
    // api
    //   .postAPI(api.BuildUrl + "form", _this.dataForm, api.form)
    //   .then((response) => {
    //     if (response.data.status == Status.success) {
    //       Message.Message(response.data.Message);
    //       _this.form = response.data.data;
    //       _this.fields = response.data.data.fields;
    //     } else {
    //       Message.error(response.data.Message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(
            "url:" +
              api.BuildUrl +
              "autoCode" +
              ",params:" +
              JSON.stringify(this.codeForm)
          );
          //   api
          //     .getAPI(api.BuildUrl + "autoCode", _this.codeForm, api.form)
          //     .then((response) => {
          //       if (response.data.status == Status.success) {
          //         Message.Message(response.data.Message);
          //       } else {
          //         Message.error(response.data.Message);
          //       }
          //     })
          //     .catch((error) => {
          //       console.error(error);
          //     });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.query {
  padding: 24px;
  width: 600px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  transition: 0.2s;
  line-height: 0px;
}
</style>