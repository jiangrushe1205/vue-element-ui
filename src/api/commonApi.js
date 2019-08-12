import { post, get, deleteAxios, apiPath } from 'common/js/http'

/**
 * 请求分页
 * @param pager 对象
 * @returns {*}
 */
export function getPager(model,pager) {
    return get( model + apiPath.commonUrl.pager,pager).then(res=>{
        return Promise.resolve(res.data)
    })
}

/**
 *  添加或者删除 sysAccount
 * @param model 业务model
 * @param obj 对象
 * @returns {*}
 */
export function createOrUdpateApi(model,obj) {
    let id = ''
    let url = ''
    let data = ''
    if (obj.id) {
        url =  model + apiPath.commonUrl.update
        data = Object.assign({},{
            id: obj.id
        },obj)
    }else {
        url = model + apiPath.commonUrl.create
        data = obj
    }

    return post(url,obj).then(res => {
        return Promise.resolve(res.data)
    })
}

/**
 *  添加或者删除 sysAccount
 * @param deleteObj 业务model
 * @param   deleteObj 对象 {
 *     id,
 *     ids
 * }
 * @returns {*}
 */
export function deleteByIdsApi(model,deleteObj) {
    let id = ''
    if (deleteObj.ids) {
        id = deleteObj.ids.split(',')
    }
    let  url = id.length > 1 ? model + apiPath.commonUrl.batchDelete : model + apiPath.commonUrl.deleteOne.replace('{id}',id)
    return deleteAxios(url,deleteObj).then( res => {
        return Promise.resolve(res.data)
    })
}
