import { commonParams } from 'common/js/config'
import { post, get, apiPath, postForm } from 'common/js/http'

// const debug = process.env.NODE_ENV !== 'production'

export function createAccountApi (params) {
    const url = apiPath.account.accountAdd
    return postForm(url, params).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function getAccountListApi (draw, start, length, params) {
    const url = apiPath.account.accountList
    const data = Object.assign({}, commonParams, {
        length: length,
        start: start,
        draw: draw
    }, params)
    return get(url, data).then((res) => {
        return Promise.resolve(res.data)
    })
}

