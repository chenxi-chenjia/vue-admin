import request from '@/utils/request'

export const findAllUserRole = (params) => {
    return request({
        url: '/findAllUserRole',
        method: 'get',
        params
    })
}

export const addUserRole = (params) => {
    return request({
        url: '/addUserRole',
        method: 'post',
        data: {
            ...params
        }
    })
}

