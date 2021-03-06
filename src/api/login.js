import request from '@/utils/request'

export function login(username, password){
    return request({
        url: '/teacherLogin',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function getInfo(token){
    return request({
        url: '/getTeacherInfo',
        method: 'get',
        params: { token }
    })
}

export function logout(){
    return request({
        url: '/logout',
        method: 'post'
    })
}
