<template>
<div class="nav-header">
  <div class="child" style="padding:0 0 0 0;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/index' }" @click.native="toClick">首页</el-breadcrumb-item>
      
      <el-breadcrumb-item v-show="currentMenuName">{{currentMenuName}}</el-breadcrumb-item>
     
    </el-breadcrumb>
  </div>
</div>
</template>

<script>

import bus from '../common/core/js/EventBus';

export default {
  data() {
    return {
      currentMenuName : "",
    };
  },
  mounted(){
    let _this = this;

    bus.$on("menuClickEvent",function(meun){
        _this.currentMenuName = meun.name;
    });
  },
  methods:{
    toClick() {
      this.currentMenuName = '';
    }
  }
};
</script>

<style scoped>
.nav-header{
    padding: 4vh;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    height: 2vh;
}
</style>
