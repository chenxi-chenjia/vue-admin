import request from '@/utils/request'

export const findAllSchools = (params) => {
    return request({
        url: '/findAllSchools',
        method: 'get',
        params
    })
}

export const addSchool = (params) => {
    return request({
        url: '/addSchool',
        method: 'post',
        data: {
            ...params
        }
    })
}

