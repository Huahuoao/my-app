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
    id:number,
    userId:string | null | number,
    text:string,
    date:string
}


interface BookDto {

    userId:string | null | number,
    name:string

}

interface BookTwoDto {

   id:number|string

}
interface BookTwoDto {

    id:number|string

}

interface BookThreeDto {

    id:number|string,
    userId:number|string,
    text:string;

}
export function listBook(param: BookDto) {
    return request({
        url: '/plan/list/book',
        method: 'post',
        data: param,
    })
}
export function addBook(param: BookDto) {
    return request({
        url: '/plan/add/book',
        method: 'post',
        data: param,
    })
}
// 获取用户信息
export function addPLan(param: PlanDto) {
    return request({
        url: '/plan/add',
        method: 'post',
        data: param,
    })
}
export function deleteBook(param: BookTwoDto) {
    return request({
        url: '/plan/delete/book',
        method: 'post',
        data: param,
    })
}
export function addPlanByBook(param: BookThreeDto) {
    return request({
        url: '/plan/add/book/plan',
        method: 'post',
        data: param,
    })
}
export function listBookPlan(param: BookTwoDto) {
    return request({
        url: '/plan/list/book/plan',
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

export function deletePlan(param: PlanDto) {
    return request({
        url: '/plan/delete',
        method: 'post',
        data: param,
    })
}

export function changePlan(param: PlanDto) {
    return request({
        url: '/plan/change',
        method: 'post',
        data: param,
    })
}