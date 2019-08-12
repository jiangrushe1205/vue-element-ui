import { getDateListPage, createDept, updateDept } from 'api/deptApi'
import { SUCCESS } from 'common/js/config'

export default class Dept {
    constructor ({ id, company, name, linkPerson }) {
        this.id = id
        this.company = company
        this.name = name
        this.linkPerson = linkPerson
    }
}

export function getDeptListPage (draw, start, length, data) {
    console.log(data)
    return new Promise((resolve, reject) => {
        getDateListPage(draw, start, length, data).then((res) => {
            console.log(res)
            if (res.code === SUCCESS) {
                resolve(res)
            }
        })
    })
}

export function saveDept (Dept) {
    return new Promise((resolve, reject) => {
        createDept(Dept).then((res) => {
            if (res.code === SUCCESS) {
                resolve(res.data)
            }
        })
    })
}

export function updateDeptService (Dept) {
    return new Promise((resolve, reject) => {
        updateDept(Dept).then((res) => {
            if (res.code === SUCCESS) {
                resolve(res.data)
            }
        })
    })
}
