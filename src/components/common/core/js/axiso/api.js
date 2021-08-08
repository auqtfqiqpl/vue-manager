import http from './http'

// get请求
export default {
    name: 'api',

    dataType: {

        form: 'form',

        json: 'Json',

        file: 'file',

        binary: 'binary',

    },
    requestMethod : {
        GET : 'GET',
        POST : 'POST'
    },
    moduleAddr: {
        BasicUrl: "/basic/web/",

        AuthUrl: "/auth/web/",

        BuildUrl: "/build/",
    },
    
    getAPI(baseUrl, params, dataFormat) {
        if (dataFormat === this.form) {
            return http.get(baseUrl, params);
        } else if (dataFormat === this.file) {
            return http.getFile(baseUrl, params);
        }
        return http.get(baseUrl, params);
    },
    postAPI(baseUrl, params, dataFormat) {
        if (dataFormat === this.form) {
            return http.postForm(baseUrl, params);
        } else if (dataFormat === this.file) {
            return http.postFile(baseUrl, params);
        } else if (dataFormat === this.json) {
            return http.postJson(baseUrl, params);
        }
        return http.postJson(baseUrl, params);
    },
    request(requestMethod,baseUrl,params,dataFormat){
        let _this = this;
        if(!requestMethod || _this.requestMethod.GET == requestMethod){
            _this.getAPI(baseUrl,params,dataFormat);
        }else{
            _this.postAPI(baseUrl,params,dataFormat);
        }

    }
}
