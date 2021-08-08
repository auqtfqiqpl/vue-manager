<template>
    <el-container>
      <el-main class="index_main" style="padding-left: 0px;padding-right: 0px;">
          <div style="padding-top:20px">
        <span class="demonstration" >您好！欢迎来到昆仑系统</span>
          </div>
        <div class="block" style="padding-top:5px">
          <el-image :src="img" style="width: 750px; height: 430px;padding-top :30px;">
          </el-image>
        </div>
      </el-main>
      <el-aside class="index_left">
        <div class="block">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-aside>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      img:require('../../images/city.jpg'),
      activities: [
        {
          content: "版本1",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more",
        },
        {
          content: "版本2",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
        },
        {
          content: "版本3",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
        {
          content: "版本4",
          timestamp: "2018-04-03 20:46",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="less" scoped>
.index_left {
  height: 78.8vh;
  background-color: #fff;
  line-height: 25px;
  padding-top: 15px;
  width: 320px;
  overflow: auto;
}
.index_main {
  color: #9c9ea0;
  overflow:hidden;  
  line-height :0px;
  font-size: 20px;
  padding: 5px,0px,5px,0px;
}
</style>