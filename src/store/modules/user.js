import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from "element-ui";

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo){
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    const data = response.data.data
                    if ( response.data.errorCode != 0 ){
                        Message.error(response.data.errorMessage)
                        reject()
                        return
                    }
                    setToken(data.token)
                    commit('SET_TOKEN', data.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit, state }){
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    const data = response.data.data
                    if ( response.data.errorCode != 0 ){
                        reject(response.data.errorMessage)
                        this.$store.dispatch('FedLogOut').then(() => {
                            location.reload() // 为了重新实例化vue-router对象 避免bug
                        })
                        return
                    }
                    if ( data.roles && data.roles.length > 0 ){ // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }
                    commit('SET_NAME', data.username)
                    commit('SET_AVATAR', data.avatar)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state }){
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }){
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user
