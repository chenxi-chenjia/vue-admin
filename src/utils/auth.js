const TokenKey = 'server-session'

export function getToken(){
    const result = sessionStorage.getItem(TokenKey)
    return result
}

export function setToken(token){
    const result = JSON.stringify(token)
    return sessionStorage.setItem(TokenKey, result)
}

export function removeToken(){
    return sessionStorage.removeItem(TokenKey)
}
