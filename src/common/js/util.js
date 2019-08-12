import Vue from "vue";
import { Message } from 'element-ui'
export const isProd = process.env.NODE_ENV === 'production'

export const isNULL = function (obj) {
    if (!obj || obj === '' || obj === undefined ||
        obj === 'undefined' || obj === 'null' || obj === 'NaN') {
        return true
    }
    return false
}

export const dateFormat = (value, formatStr) => {
    // 时间格式化
    const  time = new Date(value)
    if (time === null || time === '' || time === undefined) {
        console.log('time is Undefined')
    } else {
        const date = new Date(time)
        console.log(date, formatStr)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minu = date.getMinutes()
        const second = date.getSeconds()
        let value = ''
        switch (formatStr) {
            case 'yyyy-MM-dd HH:mm:ss':
                value = year + '-' + _timeSupplement_0(month) + "-" + _timeSupplement_0(day) + " " + _timeSupplement_0(hour) + ':' + this._timeSupplement_0(minu) + ':' + this._timeSupplement_0(second)
                break
            case 'yyyy-MM-dd':
                value = year + '-' + _timeSupplement_0(month) + "-" + _timeSupplement_0(day)
                break
        }
        return value
    }
}

function _timeSupplement_0(value) {
    return value < 10 ? ('0' + value) : value
}

export  const commonUtils = {
    successMessage: (message) => {
        Message.success({ message: message })
    },
    errorMessage : (message) => {
        Message.error({ message: message })
    }
}
