<template>
  <div class="login-container">
    <el-form
      :model="authForm"
      :rules="rules2"
      status-icon
      ref="authForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="authForm.username"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="authForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleSubmit"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import api from "../common/core/js/axiso/api";

export default {
  data() {
    return {
      logining: false,
      authForm: {},
      rules2: {
        username: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "enter your password", trigger: "blur" },
        ],
      },
      checked: false,
    };
  },
  methods: {
    handleSubmit(event) {
      var _this = this;
      this.$refs.authForm.validate((valid) => {
        if (valid) {
          _this.logining = true;
          _this.$api.postAPI(
              _this.$api.moduleAddr.AuthUrl + "access/doLogin",
              {
                username: "root",
                password: 123456,
              },
              _this.$api.dataType.form
            )
            .then((response) => {
              console.log(response);

              if (response.status == 200) {
                localStorage.token = response.data;
                _this.$router.push("/home");
              }
              debugger;
              _this.logining = false;
              
            })
            .catch(function (error) {
              console.log(error);
            });
          // _this.axios
          //   .post("/auth/web/doLogin", {
          //     username: "root",
          //     password: 123456,
          //   })
          //   .then((response) => {
          //     this.info = response;
          //     window.localStorage.token = response.data.data;
          //     //                 _this.axios.get("/basic/web/user/test",{
          //     // headers: {
          //     //     'token': response.data.data
          //     // }}).then(response =>console.log(response));
          //     //                 })
          //     //             .catch(function (error) {
          //     //                 console.log(error);
          //     _this.logining = false;
          //     alert("login success");
          //     _this.$router.push('/home')
          //   });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>