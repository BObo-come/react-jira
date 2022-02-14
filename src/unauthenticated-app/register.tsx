import React, { FormEvent } from 'react'
import { useAuth } from '../context/auth-context'
import {Form,Input,Button} from 'antd'
import { LongButton } from '.'
export const RegisterScreen = ({onError}:{onError:(error:Error)=>void}) => {
    const {register, user} = useAuth()
    const {run,isLoading} = useAsync(undefined, {throwOnError: true})
    const handleSubmit = async ({cpassword,...values}:{username:string,password:string, cpassword:string})=> {
        // event.preventDefault()
        // const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        // const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        if(cpassword !== values.password) {
            onError(new Error('请确认两次输入的密码相同'))
            return
        }
        try{
            // await register(values)
            await run(register(values))
        }catch(e){
            onError(e as Error)
        }
    }
    return  <Form onFinish={handleSubmit}>
    <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
        {/* <label htmlFor='username'>用户名</label> */}
        <Input placeholder='用户名' type="text" id='username' />
    </Form.Item>
    <Form.Item name={'password'} rules={[{required:true,message:'请输入密码'}]}>
        {/* <label htmlFor='password'>密码</label> */}
        <Input placeholder='密码' type="password" id='password' />
    </Form.Item>
    <Form.Item name={'cpassword'} rules={[{required:true,message:'请确认密码'}]}>
        {/* <label htmlFor='password'>密码</label> */}
        <Input placeholder='确认密码' type="password" id='cpassword' />
    </Form.Item>
    <Form.Item>
         <LongButton loading={isLoading} htmlType='submit' type='primary'>注册</LongButton>
    </Form.Item>
</Form>
}