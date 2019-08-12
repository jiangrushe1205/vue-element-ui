import Axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

import Vue from 'vue'
import router from '../../router'
Vue.use(router)

//环境变量中的基础URL
const baseUrl = process.env.VUE_APP_BASE_URL
const AUTH_TOKEN = localStorage.getItem('token')
/**
 * 配置静态路径
 * @type {{login: string, dept: {deptAdd: string, deptUpdate: string, deptDelete: string, getTablelist: string}, upload: {moreUploadFiles: string, formUploadFiles: string, download: string}, sysmenu: {sysmenuList: string}}}
 */
export const apiPath = {
    login: '/login/verify',
    commonUrl: {
        pager: '/pager',
        create: '/save',
        update: '/update',
        deleteOne: '/delete/{id}',
        batchDelete: '/delete/batch',
    },
    sysAccount: {
        model: '/sysAccount'
    },
    member: {
        model: '/member'
    },
    dept: {
        deptAdd: '/dept/add',
        deptUpdate: '/dept/update',
        deptDelete: '/dept/delete',
        getTablelist: '/dept/getTableList'
    },
    upload: {
        moreUploadFiles: '/upload/more/file',
        formUploadFiles: '/upload/form/file',
        download: '/download/',
        read: '/upload/read/file'
    },
    sysmenu: {
        sysmenuList: '/sysmenu/list',
        sysmenuAdd: '/sysmenu/add',
        sysmenuDelete: '/sysmenu/delete/{id}'
    },
    account: {
        accountList: '/account/getTableList',
        accountAdd: '/account/save',
        deptDelete: '/account/delete'
    }
}

const service = Axios.create({
    // 请求超时时间
    timeout: 15000,
    // 每次请求头携带cookie
    withCredentials: true,
    baseURL: baseUrl
})


service.defaults.headers.common['Authorization'] = AUTH_TOKEN
// request拦截器
service.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
}, error => {
    console.log(error)
    Message.error({ message: '请求出错' })
    return Promise.resolve(Message)
})

/**
 * 响应数据拦截
 */
service.interceptors.response.use(response => {
    const data = response.data
    if (data.code !== 0) {
        Message.error({ message: data })
    }
    return response
}, error => {
    console.log('http 请求错误信息:')
    console.log(error)
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '请求错误( 400 )'
                break
            case 401:
                error.message = '未授权，请重新登录( 401 )'
                router.push('/login')
                break
            case 403:
                error.message = '拒绝访问( 403 )'
                break
            case 404:
                error.message = '服务器路径不存在( 404 )'
                break
            case 408:
                error.message = '请求超时( 408 )'
                break
            case 500:
                error.message = '服务器错误( 500 )'
                router.push('/login')
                break
            case 501:
                error.message = '服务未实现( 501 )'
                break
            case 502:
                error.message = '网络错误( 502 )'
                break
            case 503:
                error.message = '服务不可用( 503 )'
                break
            case 504:
                error.message = '网络超时( 504 )'
                break
            case 505:
                error.message = 'HTTP版本不受支持( 505 )'
                break
            default:
                error.message = '连接出错(' + error.response.status + ')!'
        }
    } else {
        error.message = '连接服务器失败!'
        router.push('/login')
    }
    Message.error({
        type: 'error',
        message: error.message
    })
    return
})

/**
 * https post 请求
 * @param url
 * @param data
 * @returns {Promise<AxiosResponse | never>}
 */
export const post = (url, data) => {
    return service.post(url, qs.stringify(data)).then((req) => {
        return Promise.resolve(req)
    })
}

export const postForm = (url, data) => {
    return service.post(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((req) => {
        return Promise.resolve(req)
    })
}

export const postJson = (url, data) => {
    return service.post(url, data, {
        headers: { 'Content-Type': 'application/json' }
    }).then((req) => {
        return Promise.resolve(req)
    })
}
/**
 * https get 请求
 * @param url
 * @param data
 * @returns {Promise<AxiosResponse | never>}
 */

export const get = (url, data) => {
    let params = qs.stringify(data)
    return service.get(url + '?' + params).then((req) => {
        return Promise.resolve(req)
    })
}

export const deleteAxios = (url, data) => {
    let params = qs.stringify(data)
    return service.delete(url + '?' + params).then((req) => {
        return Promise.resolve(req)
    })
}


export const upload = (url, data) => {
    return service.post(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then((req) => {
        return Promise.resolve(req)
    })
}

export const download = (url, data) => {
    let params = qs.stringify(data)
    let iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = baseUrl + url + '?Authorization=' + AUTH_TOKEN + '&' + params
    iframe.onload = function () {
        document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
}

export const lookImg = (url, data) => {
    let params = qs.stringify(data)
    return baseUrl + url + '?' + params + '&Authorization=' + AUTH_TOKEN
}

export default service

