import { useEffect,useRef,useState } from "react"
export const isFalsy = (value: unknown)  => value === 0 ? false : !value

export const isVoid = (value:unknown) => value === undefined || value === null || value === ''
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: {[key:string]: unknown}) => { 
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if(isVoid(value)){
            delete result[key]
        }
    })
    return result
}


export const useMount = (callback: () => void) => {
    useEffect(() => {
       callback()
       //TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const useDocumentTitle = (title: string, keepOnUnmout:boolean = true) => {
    const oldTitle = useRef(document.title).current;
    // 页面加载时L oldTitle === 旧title'React App'
    // 加载后 oldTitle === '新title
    console.log('渲染时的oldTitle',oldTitle)

    useEffect(() => {
        document.title = title
    },[title])
    
    useEffect(() => {
        return () => {
            if(!keepOnUnmout){ 
                // 如果不指定依赖，读到的就是旧title  
                console.log('卸载时的oldTitle',oldTitle)
                document.title = oldTitle
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[keepOnUnmout,oldTitle])
}

const test = () => {
    let num = 0

    const effect = () => {
        num+=1
        const message = `现在的num值${num}`
        return function unmount() {
            console.log(message)
        }
    }
    return effect
}

// 执行test返回effect
const add = test()
// 执行effect函数，返回引用了message的unmount
const ummount = add()
// 再次执行effect函数，返回了引用了message2的unmount 
add()
add()
ummount() // 1