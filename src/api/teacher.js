import request from '@/utils/request'

// 通过查询内容搜索员工
export const searchTeacherBySearchContent = (params) => {
    return request({
        url: '/searchTeacherBySearchContent',
        method: 'get',
        params
    })
}

// 判断员工username是否可用
export const searchUsernameCount = (params) => {
    return request({
        url: '/searchUsernameCount',
        method: 'get',
        params
    })
}

// 判断员工phoneNumber是否可用
export const searchPhoneNumberCount = (params) => {
    return request({
        url: '/searchPhoneNumberCount',
        method: 'get',
        params
    })
}

// 判断员工email是否可用
export const searchEmailCount = (params) => {
    return request({
        url: '/searchEmailCount',
        method: 'get',
        params
    })
}

// 判断员工姓名是否可用
export const searchNameCount = (params) => {
    return request({
        url: '/searchNameCount',
        method: 'get',
        params
    })
}

// 添加员工
export const addTeacher = (params) => {
    return request({
        url: 'addTeacher',
        method: 'post',
        data: {
            ...params
        }
    })
}

// 通过userId查询员工
export const getTeacherInfoById = (params) => {
    return request({
        url: 'getTeacherInfoById',
        method: 'get',
        params
    })
}

// 管理员修改员工信息
export const updateTeacherInfoByAdmin = (params) => {
    return request({
        url: 'updateTeacherInfoByAdmin',
        method: 'put',
        data: {
            ...params
        }
    })
}

// 删除员工（软删除）
export const deleteTeacher = (params) => {
    return request({
        url: 'deleteTeacher',
        method: 'delete',
        params
    })
}
