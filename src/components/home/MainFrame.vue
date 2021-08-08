<template>
  <div class="mainFrame">
    <main-header></main-header>
    <main-center></main-center>
  </div>

</template>

<script>
import MainCenter from './MainCenter.vue'
import MainHeader from "./MainHeader.vue"

export default {
  components :{
    MainCenter,
    MainHeader
  },  
  data() {
    return {};
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 退出功能
    logout() {
      // 清空token
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    menuCollapse(flag) {
      // debugger;
      this.isCollapse = flag;
    },
  },
};
</script>

<style lang="less" scoped>
  .mainFrame {
      overflow: hidden;
      height: 89.5vh;
  }
</style>