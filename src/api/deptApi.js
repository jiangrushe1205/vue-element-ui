import { commonParams } from 'common/js/config'
import { post, get, apiPath } from 'common/js/http'

// const debug = process.env.NODE_ENV !== 'production'

export function getDateListPage (draw, start, length, params) {
    const url = apiPath.dept.getTablelist
    const data = Object.assign({}, commonParams, {
        length: length,
        start: start,
        draw: draw
    }, params)
    return get(url, data).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function createDept (params) {
    const url = apiPath.dept.deptAdd
    const data = Object.assign({}, commonParams, params)
    return get(url, data).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function updateDept (params) {
    const url = apiPath.dept.deptUpdate
    const data = Object.assign({}, commonParams, params)

    return post(url, data).then((res) => {
        return Promise.resolve(res.data)
    })
}
