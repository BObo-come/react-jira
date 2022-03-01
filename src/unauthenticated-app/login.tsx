import React, { FormEvent } from 'react'
import { useAuth } from '../context/auth-context'
import {Form,Input,Button} from 'antd'
import { LongButton } from '.'
import { useAsync } from '../utils/use-async'
import { useDispatch } from 'react-redux'

export const LoginScreen = ({onError}:{onError:(error:Error)=>void}) => {
    const {login, user} = useAuth()
    const {run,isLoading} = useAsync(undefined, {throwOnError: true})
    const dispatch = useDispatch()


    const handleSubmit = async  (values: {username:string, password:string})=> {
        // event.preventDefault()
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        // login(values)
        try{
            await dispatch(login(values))
            // await run(login(values))
        }catch(e){
            onError(e as Error)
        }
    }
    return (
    <Form onFinish={handleSubmit}>
        {/* {error ? console.error(.message:'')} */}
        
        <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
            {/* <label htmlFor='username'>用户名</label> */}
            <Input placeholder='用户名' type="text" id='username' />
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true,message:'请输入密码'}]}>
            {/* <label htmlFor='password'>密码</label> */}
            <Input placeholder='密码' type="password" id='password' />
        </Form.Item>
        <Form.Item>
             <LongButton loading={isLoading} htmlType='submit' type='primary'>登录</LongButton>
        </Form.Item>
    </Form>
    );
}