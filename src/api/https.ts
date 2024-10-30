/****   http.js   ****/
// 导入封装好的axios实例
import request from './request.js'
const http = {

    /**
     * methods: 请求
     * @param url 请求地址 
     * @param data 请求参数
     */
    // 请求头是默认的json
    get(url:any, data:any) {
        const config = {
            method: 'get',
            url: url,
        }
        if (data) config.data = data
        return request(config)
    },
    // post请求头是的json
    post(url, data) {
        const config = {
            method: 'post',
            url: url,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
        }
        if (data) config.data = data
        return request(config)
    },
    // patch请求
    patch(url, data) {
        const config = {
            method: 'patch',
            url: url,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            }
        }
        if (data) config.data = data
        return request(config)
    },
    // 文件流的格式
    postFile(url, data) {
        const config = {
            url: url,
            method: 'post',
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            responseType: 'blob'
        }
        if (data) config.data = data
        return request(config)
    },
    // post请求头是form
    postForm(url, data) {
        const config = {
            method: 'post',
            url: url,
            header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        }
        if (data) config.data = data
        return request(config)
    },
    // post请求头是 multipart/form-data
    postUp(url, data) {
        const config = {
            method: 'post',
            url: url,
            header: {
                "Content-Type": "multipart/form-data"
            }
        }
        if (data) config.data = data
        return request(config)
    },
}
//导出
export default http