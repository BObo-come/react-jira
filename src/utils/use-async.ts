import { useState } from "react"

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState:State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

export const useAsync = <D>(initialState?:State<D>,initialConfig?:typeof defaultConfig) => {
    const config = {...defaultConfig,...initialConfig}
    console.log(config)
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    // useState直接传入函数的含义是：惰性初始化，所以用useState保存函数不能直接传入函数
    const [retry,setRetry] = useState(()=>()=>{})

    const setData = (data:D) => setState({
        data,
        stat:'success',
        error:null
    })

    const setError = (error:Error) => setState({
        error,
        stat:'error',
        data:null
    })

    // run 用来出发异步请求
    const run =(promise:Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
        if(!promise || !promise.then) {
            throw new Error('请传入Promise类型数据')
        }
        setRetry(()=>()=> {
            console.log('接收到了')
            if(runConfig?.retry){
                
                run(runConfig?.retry(),runConfig)
            }
        })
        setState({...state,stat:'loading'})
        return promise
        .then(data => {
            setData(data)
            return data
        }).catch(error => {
            // catch会消化异常，如果不主动抛出，外面是接收不到异常的
            setError(error)
            console.log(config.throwOnError)
            if(config.throwOnError) return Promise.reject(error)
        })
    }

    // const retry = () => {
    //     run(oldPromise)
    // }

    return {
        isIdle:state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSucess: state.stat === 'success',
        run,
        setData,
        setError,
        //retry被调用时，从新跑一边run,让state刷新一遍
        retry,
        ...state
    }
}