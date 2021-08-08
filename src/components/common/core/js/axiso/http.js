/****   http.js   ****/
// 导入封装好的axios实例
import request from './request'

const http ={
    /**
     * methods: 请求
     * @param url 请求地址 
     * @param params 请求参数
     */
    get(url,params){
        const config = {
            method: 'get',
            dataFormat : 'form',
            url:url
        }
        if(params) config.params = params;
        return request(config)
    },
    getFile(url,params){
        const config = {
            method: 'get',
            dataFormat : 'file',
            url:url
        }
        if(params) config.params = params;
        return request(config)
    },
    postForm(url,params){
        const config = {
            method: 'post',
            dataFormat : 'form',
            url:url
        }
        if(params) config.params = params;
        return request(config)
    },
    postJson(url,params){
        const config = {
            method: 'post',
            dataFormat : 'json',
            url:url
        }
        if(params) config.data = params;
        return request(config)
    },
    postFile(url,params){
        const config = {
            method: 'post',
            dataFormat : 'file',
            url:url
        }
        if(params) config.params = params;
        return request(config)
    }
}

export default http
