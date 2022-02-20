import { cleanObject } from '.';
import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"

// 返回页面url中指定键的参数值
export const useUrlQueryParam = <K extends string>(keys:K[]) => {
    const [searchParams,setSearchParams] = useSearchParams()
    return [
        useMemo(
            ()=>keys.reduce((prev:{[key in K]:string},key:K) => {
             return {...prev, [key]:searchParams.get(key) || ''}
            },{} as {[key in K]:string})
            ,[searchParams,keys]),
        (params: Partial<{[Key in K]: unknown}>) => {
            const o = cleanObject({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
            return setSearchParams(o)
        }
    ] as const
}
// export const useUrlQueryParam=<K extends string>(keys:K[])=>{
//     const [searchParams,setSearchParam]=useSearchParams();
//     return [keys.reduce((prev:{[key in K]:string},key:K)=>{
//     return {...prev,[key]:searchParams.get(key)||""}
//     },{} as {[key in K]:string} ),
//     setSearchParam
//     ] as const
//     }