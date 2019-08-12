import { getPager, createOrUdpateApi, deleteByIdsApi } from "api/commonApi";
import { apiPath } from 'common/js/http'

const model = apiPath.sysAccount.model

export function sysAccountGetPager(start,pageSize, name) {
    return new Promise ((resolve,reject) => {
        getPager(model,{
            'start': start,
            'pageSize': pageSize,
            'name': name
        }).then(res => {

            if(res.code === 0) {
                resolve(res)
            }else {
                reject()
            }
        })

    })
}

export function createOrUdpateService(sysAccount) {
    return new Promise ((resolve, reject) => {
        createOrUdpateApi(model,sysAccount).then(res => {
            if(res.code === 0) {
                resolve(res)
            }else {
                reject()
            }
        })

    })
}

export function deleteOneOrBatchService(ids) {
    return new Promise ((resolve, reject) => {
        deleteByIdsApi(model,{
            'ids': ids
        }).then(res => {
            if(res.code === 0) {
                resolve(res)
            }else {
                reject()
            }
        })

    })
}
