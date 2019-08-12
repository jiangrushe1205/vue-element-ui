import { getSysmenuListApi, sysmenuAddApi, sysmenuDeleteApi } from 'api/sysmenuApi'
import { SUCCESS } from 'common/js/config'

export default class Sysmenu {
    constructor ({ name, href, children, isFloder }) {
        this.name = name
        this.href = href
        this.children = children
        this.isFloder = isFloder
    }
}

export function createMenu (menuData) {
    return new Sysmenu({
        name: menuData.name,
        href: menuData.href,
        children: menuData.children,
        isFloder: menuData.isFloder
    })
}

export function getSysmenuList () {
    return new Promise((resolve, reject) => {
        getSysmenuListApi().then((res) => {
            console.log(res)
            if (res.code === SUCCESS) {
                resolve(res.data)
            } else {
                reject(new Error('no data '))
            }
        })
    })
}

export function sysmenuAdd (data) {
    return new Promise((resolve, reject) => {
        sysmenuAddApi(data).then((res) => {
            console.log(res)
            if (res.code === SUCCESS) {
                resolve(res)
            } else {
                reject(new Error('no data '))
            }
        })
    })
}

export function sysmenuDelete (id) {
    return new Promise((resolve, reject) => {
        sysmenuDeleteApi(id).then((res) => {
            console.log('删除返回数据')
            console.log(res)
            if (res.code === SUCCESS) {
                resolve(res.data)
            } else {
                reject(new Error('no data '))
            }
        })
    })
}
