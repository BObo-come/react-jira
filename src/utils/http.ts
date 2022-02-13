import { useAuth } from './../context/auth-context';

import qs from "qs"
import * as auth from '../auth-provider'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit{
    token?:string,
    data?: object
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}:Config={}) => {
    const config = {
        method: 'GET',
        headers:{
            Authorization:token ? `Bearer ${token}` : '',
            'Content-Type':data?'application/json' : '',
        },
        ...customConfig
    }

    if(config.method.toUpperCase()==='GET'){
        endpoint+=`?${qs.stringify(data)}`
    }else{
        config.body = JSON.stringify(data || {})
    }

    return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
        if(response.status === 401) {
            await auth.logout()
            window.location.reload()
            return Promise.reject({message:'请重新登录'})
        }
        const data = await response.json()
        if(response.ok){
            return data
        }else{
            return Promise.reject(data)
        }
    })
}

// js中的typeof是在tuntime时运行的

// ts中的typeof是在静态环境运行的

export const useHttp = () => {
    const {user} = useAuth()
    // utility type用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
    return (...[endpoint, config]:Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}

// TS中的 Utility types 充当工具的类型

// 联合类型

let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7

let jackFavoriteNumber: string | number

// 类型别名
// 类型别名在很多情况下可以喝interface呼唤

// interface Person {
//     name: string
// }

// type Person = {name:string}


// interface在这种情况下没法替代type
// type FavoriteNumber = string | number
// let roseFavoriteNumber: FavoriteNumber = '6'

// interface 也没法实现Utility type

type Person = {
    name:string,
    age:number
}

const xiaoming: Partial<Person> = {}
const shenmiren: Omit<Person,'name'|'age'> = {}