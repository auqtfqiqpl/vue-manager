<template>
  <div class="query">
    <el-form
      :model="codeForm"
      ref="codeForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="表名" prop="tableName" label-width="150px">
        <el-input v-model="codeForm.tableName" placeholder="请输入生成代码的表名称"></el-input>
      </el-form-item>
      <el-form-item label="表名前缀(剔除)" prop="prefix" label-width="150px">
        <el-input v-model="codeForm.prefix" placeholder="请剔除生成的表名前缀"></el-input>
      </el-form-item>
      <el-form-item label="包名称" prop="packages" label-width="150px">
        <el-input v-model="codeForm.packages" placeholder="请生成的类的包名"></el-input>
      </el-form-item>
      <el-form-item label="模块名称" prop="module" label-width="150px">
        <el-input v-model="codeForm.module" placeholder="请生成的类的模块名"></el-input>
      </el-form-item>
      <el-form-item label="功能名称" prop="fun" label-width="150px">
        <el-input v-model="codeForm.fun" placeholder="请生成的类的功能名称"></el-input>
      </el-form-item>
       <el-form-item label="代码目录" prop="projectPath" label-width="150px">
        <el-input v-model="codeForm.projectPath" placeholder="请生成的代码目录"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author" label-width="150px">
        <el-input v-model="codeForm.author" placeholder="请生成的类的作者"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('codeForm')">立即生成</el-button>
        <el-button @click="resetForm('codeForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '../js/axiso/api';
import Status from '../js/status';


export default {
  name: "QueryView",
  data() {
    return {
     codeForm:{
         tableName:'',
         prefix:'',
         packages:'',
         module:'',
         fun:'',
         author:'',
         projectPath:''
     },
     rules: {
          tableName: [
            { required: true, message: '请输入生成代码的表名称', trigger: 'blur' },
          ],
          prefix: [
            { required: true, message: '请剔除生成的表名前缀', trigger: 'change' }
          ],
          packages: [
            { required: true, message: '请生成的类的包名', trigger: 'change' }
          ],
          module: [
            { required: true, message: '请生成的类的模块名', trigger: 'change' }
          ],
          fun: [
            { required: true, message: '请生成的类的功能名称', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请生成的类的作者', trigger: 'blur' }
          ],
          projectPath: [
            { required: false, message: '请生成的代码目录', trigger: 'blur' }
          ]
        }
    };
  },
  created (){
    let historyForm = window.localStorage.getItem('codeForm');
    if(historyForm){
      this.codeForm = JSON.parse(historyForm);
    }
  },
  destroyed(){
    console.log(this.codeForm);
    window.localStorage.setItem('codeForm',JSON.stringify(this.codeForm));
  },
  methods: {      
    submitForm(formName) {

        let _this = this;
        window.localStorage.setItem('codeForm',JSON.stringify(this.codeForm));

        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('url:'+api.BuildUrl+"autoCode"+',params:'+JSON.stringify(this.codeForm));
            api.getAPI(api.BuildUrl+"autoCode",_this.codeForm,api.form).then((response)=>{
                if(response.status ==  Status.success){
                      Message.Message(response.message);
                }else{
                  Message.error(response.message);
                }
            }).catch((error)=>{
                console.error(error);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
};
</script>

<style scoped>
.query {
  padding: 24px;
  width:600px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  transition: 0.2s;
  line-height: 0px;
}
</style>