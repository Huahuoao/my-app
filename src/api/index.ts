// 导入axios实例
import request from "../request/request";

// 定义接口的传参
interface UserInfoParam {
    username: string,
    password: string
}
// 获取用户信息
export function login(param: UserInfoParam) {
    return request({
        url: '/user/login',
        method: 'post',
        data: param,
    })
}

interface PlanDto {
    userId:string | null | number,
    text:string,
    date:string
}
// 获取用户信息
export function addPLan(param: PlanDto) {
    return request({
        url: '/plan/add',
        method: 'post',
        data: param,
    })
}

export function listPLan(param: PlanDto) {
    return request({
        url: '/plan/list',
        method: 'post',
        data: param,
    })
}

