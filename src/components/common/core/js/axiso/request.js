// 导入axios
import axios from 'axios'

import { Message } from 'element-ui';


//1. 创建新的axios实例，
const service = axios.create({
    // 公共接口--这里注意后面会讲
    baseURL: process.env.BASE_API,
    timeout: 5 * 1000
})
// 2.请求拦截器
service.interceptors.request.use(config => {

    config.headers = {}

    if(config.dataFormat === 'form'){
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }else if(config.dataFormat === 'file'){
        config.headers['Content-Type'] = 'multipart/form-data';
    }else if(config.dataFormat === 'binary'){
        config.headers['Content-Type'] = 'application/octet-stream';
    }else if(config.dataFormat === 'json'){
        config.headers['Content-Type'] = 'application/json';
    }

    config.data = JSON.stringify(config.data);

    let token = getCookie('token');

   //debugger
    if (token) {
        //config.params = { 'token': token }
        config.headers.token = token;
    }else{
        token = getToken();
        if(token && token != 'undefined' && token != 'null' && token != 'NULL'){
            config.headers.token = token;
        }

    }

    return config
}, error => {
    Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(response => {
    let  data = response.data;
    switch (data.status) {
        case 401:
            Message.error('未授权，请重新登录');
            window.location.href = "/#/login";
            break;
        default:
         return response.data;
    }
}, error => {
    /***** 接收到异常响应的处理开始 *****/
    console.error(error);
    if (error && error.response) {
        //根据响应码具体处理
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break;
            case 401:
                error.message = '未授权，请重新登录'
                break;
            case 403:
                error.message = '拒绝访问'
                break;
            case 404:
                error.message = '请求错误,未找到该资源'
                window.location.href = "/NotFound"
                break;
            case 405:
                error.message = '请求方法未允许'
                break;
            case 408:
                error.message = '请求超时'
                break;
            case 500:
                error.message = '服务器端出错'
                break;
            case 501:
                error.message = '网络未实现'
                break;
            case 502:
                error.message = '网络错误'
                break;
            case 503:
                error.message = '服务不可用'
                break;
            case 504:
                error.message = '网络超时'
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                break;
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        // 超时处理
        if (JSON.stringify(error).includes('timeout')) {
            Message.error('服务器响应超时，请刷新当前页')
        }
        error.message= '连接服务器失败';
    }

    Message.error(error.message)
    return Promise.resolve(error.response)
});
const getCookie = function(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      console.log(c)
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1){
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

const getToken = function() {
    const token = localStorage.getItem("token");
    // if (token === "" || token == null) {
    //     this.$message({
    //         showClose: true,
    //         message: "请先登录",
    //         type: "error",
    //         duration: "3000"
    //     });
    //     // Message.error('请先登录')

    //     this.$router.push({ path: "/login" });
    // }
    return token;
  }
  const setToken = function(token) {
    localStorage.setItem("token", token);
  }
  

export default service
