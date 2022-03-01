import { ReactNode, useCallback } from 'react';

// import { register, logout } from './../auth-provider';
import React,{ useState } from 'react';
import * as auth from '../auth-provider'
import { User } from '../screens/project-list/search-panel';
import { http } from '../utils/http';
import { useMount } from '../utils';
import { useAsync } from '../utils/use-async';
import { FullPageErrorback, FullPageLoading } from '../components/lib';
import * as authStore from '../store/auth.slice'
import { useDispatch, useSelector } from 'react-redux';


export interface AuthForm {
    username:string,
    password:string
}

export const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if(token) {
        const data = await http('me',{token})
        user = data.user
    }
    return user
}

// const AuthContext = React.createContext<{
//     user:User|null,
//     register:(form:AuthForm) => Promise<void>,
//     login:(form:AuthForm) => Promise<void>,
//     logout:() => Promise<void>,
// }|undefined>(undefined)
// AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}:{children:ReactNode}) => {
    // const [user, setUser] = useState<User | null>(null)
    const {error,isLoading,isIdle,isError,run,setData: setUser} = useAsync< User | null>()

    const dispatch:(...args: unknown[]) => Promise<User> = useDispatch()
    useMount(() => {
        // bootstrapUser().then(setUser)
        run(dispatch(authStore.bootstrap()))
    })
    if(isError) {
        return <FullPageErrorback error={error}/>
    }
    return <div>{children}</div>
    // const login = (form:AuthForm) => auth.login(form).then(setUser)
    // const register = (form:AuthForm) => auth.register(form).then(setUser)
    // const logout = () => auth.logout().then(() => setUser(null))

    // useMount(() => {
    //     // bootstrapUser().then(setUser)
    //     run(bootstrapUser())
    // })

    // if(isIdle || isLoading) {
    //     return <FullPageLoading/>
    //     // return <p>Loading</p>
    // }

    // if(isError) {
    //     return <FullPageErrorback error={error}/>
    // }

    // return <AuthContext.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const context = React.useContext(AuthContext)
    // if(!context){
    //     throw new Error('userAuth必须在AuthProvider中使用')
    // }
    const dispatch:(...args: unknown[]) => Promise<User> = useDispatch()
    const user = useSelector(authStore.selectUser)
    const login = useCallback((form:AuthForm) => dispatch(authStore.login(form)),[dispatch])
    const register = useCallback((form:AuthForm) => dispatch(authStore.register(form)),[dispatch])
    const logout = useCallback(() => dispatch(authStore.logout()),[dispatch])
    return {
        user,
        login,
        register,
        logout
    }
}