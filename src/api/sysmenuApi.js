import { post, get, apiPath } from 'common/js/http'

// const debug = process.env.NODE_ENV !== 'production'

export function getSysmenuListApi () {
    const url = apiPath.sysmenu.sysmenuList
    return get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function sysmenuAddApi (data) {
    const url = apiPath.sysmenu.sysmenuAdd
    return post(url, data).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function sysmenuDeleteApi (id) {
    const url = apiPath.sysmenu.sysmenuDelete.replace('{id}', id)
    console.log(url)
    return get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}
