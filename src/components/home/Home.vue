<template>
  <div style="height: 100%; padding: 0xpx; margin: 0px">
    <el-container style="height: 100vh">
      <el-header style="background-color: #333; height: 10vh">
        <el-row>
          <el-col :span="4">
            <!-- <i
            class="el-icon-delete"
            style="font-size: 25px; padding-right: 2px"
          ></i
          > -->
            <i
              class="iconfont icon-Iconfont"
              style="font-size: 30px; padding-right: 10px; color: #fff"
            ></i>
            <span style="font-size: 25px; color: #fff">昆仑系统</span>

            <i
              v-show="isCollapse == false"
              class="el-icon-s-fold"
              style="font-size: 25px; padding-left: 25px; color: #fff"
              @click="menuCollapse(true)"
            ></i>

            <i
              v-show="isCollapse == true"
              class="el-icon-s-unfold"
              style="font-size: 25px; padding-left: 25px; color: #fff"
              @click="menuCollapse(false)"
            ></i>
          </el-col>
          <el-col :span="16"
            ><div class="grid-content bg-purple">...</div></el-col
          >
          <el-col :span="4">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i
                  class="iconfont icon-dengluren"
                  style="font-size: 25px; color: #fff"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="set">设置</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span style="font-size: 18px; color: #fff; padding-left: 14px"
              >您好，蒋先生！</span
            ></el-col
          >
        </el-row>
      </el-header>
      <el-container style="90vh;">
        <menu-nav :isCollapse="isCollapse"></menu-nav>
        <el-Main style="height: 89.9vh; padding: 0.5vh 0.5vh 0vh 0.5vh"
          ><main-frame></main-frame
        ></el-Main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MenuNav from "./MenuNav.vue";
import MainFrame from "./MainFrame.vue";
export default {
  components: {
    MainFrame,
    MenuNav,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    handleCommand(command) {
      if (command) {
        alert(command);
        "logout" === command ? this.logout() : this.set();
      }
    },
    set() {
      console.log("set");
    },
    // 退出功能
    logout() {
      let _this = this;
      // 清空token
      _this.$api
        .getAPI(
          _this.$api.module.AuthUrl + "access/logout",
          {},
          _this.$api.dataType.form
        )
        .then((response) => {
          console.log(response);
          window.sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    menuCollapse(flag) {
      // debugger;
      this.isCollapse = flag;
    },
  },
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-submenu__title {
  padding-left: 2px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #fff;
  text-align: center;
  line-height: 160px;
  /* padding-left: 0.5vh;
  padding-right: 0.5vh;
  padding-top: 0.5vh; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  min-height: 64px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-dropdown {
  height: 38px;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 227px;
  min-height: 400px;
}
</style>