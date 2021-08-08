<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical"
    :collapse="isCollapse"
    :router="isRouter"
    style="height: 90vh"
  >
    <el-submenu
      v-for="(menu, index) in menuList"
      :key="index"
      :index="menu.code"
    >
      <template v-if="!menu.leaf" slot="title">
        <i :class="menu.icon"></i>
        <span>{{ menu.name }}</span>
      </template>
      <el-menu-item-group v-if="menu.hasSubMenu">
        <el-menu-item
          v-for="(subMenu, submenuIndex) in menu.subMenuList"
          :key="submenuIndex"
          :index="subMenu.path"
          v-on:click="menuClick(subMenu)"
          >{{ subMenu.name }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import bus from "../common/core/js/EventBus";

export default {
  data() {
    return {
      isRouter: true,
      menuList: [],
    };
  },
  props: {
    isCollapse: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    //get meun list data;
    this.getMenuData();
  },
  methods: {
    getMenuData() {
      let _this = this;
      _this.$api
        .getAPI(
          _this.$api.moduleAddr.AuthUrl + "menu/getAll",
          {},
          _this.$api.dataType.form
        )
        .then((response) => {
          _this.menuList = response.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    menuClick(menu) {
      bus.$emit("menuClickEvent", menu);
      console.log(menu);
    },
    menuCollapse(flag) {
      // debugger;
      this.isCollapse = flag;
    },
  },
};
</script>

<style scoped>
</style>