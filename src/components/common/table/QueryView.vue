<template>
  <div class="query"> 
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-right:20px">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
 export default {
   name : "QueryView",
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>
.query{
    padding: 24px;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    transition: .2s;
    line-height: 0px;
    height: 100px;
}
</style>