import { getAccountListApi, createAccountApi } from 'api/accountApi'
import { SUCCESS } from 'common/js/config'



export function getAccountList (draw, start, length, data) {
    console.log(data)
    return new Promise((resolve, reject) => {
        getAccountListApi(draw, start, length, data).then((res) => {
            console.log(res)
            if (res.code === SUCCESS) {
                resolve(res)
            }
        })
    })
}


export function accountAdd (data) {
    return new Promise((resolve, reject) => {
        createAccountApi(data).then((res) => {
            console.log(res)
            if (res.code === SUCCESS) {
                resolve(res)
            } else {
                reject(new Error('no data '))
            }
        })
    })
}
