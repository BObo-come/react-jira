import { useEffect,useState } from "react"
export const isFalsy = (value: unknown)  => value === 0 ? false : !value

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => { 
    const result = {...object}
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key]
        if(isFalsy(value)){
            // @ts-ignore
            delete result[key]
        }
    })
    console.log(result)
    return result
} 


export const useMount = (callback: () => void) => {
    useEffect(() => {
       callback()
    }, [])
}


// const debounce = (func, delay) => {
//     let timeout
//     return (...param) => {
//         if(timeout) {
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(function(){
//             func(...param)
//         },delay)
//     }
// }
// const log = debounce(() => console.log('call'),5000)
// log()
// log()
// log()
// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay? : number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    //console.log(value.mayNotExist)
    useEffect(() => {
        // 每次在value变化以后设置一个定时器
        const timeout = setTimeout(()=> setDebouncedValue(value),delay)
        // 每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    },[value, delay])
    return debouncedValue
}

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add:(item:T) => setValue([...value,item]),
        clear: ()=> setValue([]),
        removeIndex: (index:number) => {
            const copy = [...value]
            copy.splice(index,1)
            setValue(copy)
        }
    }
}